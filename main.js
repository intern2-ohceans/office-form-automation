
import { link } from './config/config.js';
import { delay } from "./config/config.js";
import { chromium } from 'playwright';

import { validateInput } from './utils/validateInput.js';
import { findQuestionType } from './utils/findQuestionType.js';
import { handleInput } from './utils/handleInput.js';
import { readInput } from './utils/readInput.js';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage(); 
  await page.goto(link);
  let rows = await readInput();
  let input = rows[0];

  let questionNumber = 1;
  let questionIndex = 0;
  let hasSubmitButton = await page.locator('[data-automation-id="submitButton"]').isVisible();
  let isFinalPage = false;
  
  while(!isFinalPage){
    let questions = await page.locator('[data-automation-id="questionItem"]').all();
    for(let i = 0; i<questions.length; i++){
      let questionType = await findQuestionType(questions[i]);
      let curIndex = i + questionIndex;
      let validInput = await validateInput(input[i], questions[i], questionType);
      await handleInput(validInput,input[curIndex],questions[i],questionType,page);
      await page.waitForTimeout(delay);
      await questions[i].screenshot({ path: './screenshots/' + 'question'+ questionNumber.toString() +'.png', fullPage: true});
      questionNumber += 1;
    }
    questionIndex += questions.length;
    let hasNextButton = await page.getByLabel('Next').isVisible();
    
    if(hasNextButton){
        await page.getByLabel('Next').click();
    }
    if(hasSubmitButton){
      isFinalPage = true;
    }
    hasSubmitButton = await page.locator('[data-automation-id="submitButton"]').isVisible();
  }

  await browser.close();
})();