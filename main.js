
import { chromium } from 'playwright';

import { link, delay } from './config/config.js';
import { validateInput } from './utils/validateInput.js';
import { findQuestionType } from './utils/findQuestionType.js';
import { handleInput } from './utils/handleInput.js';
import { readInput } from './utils/readInput.js';

//Main driver code 

(async () => {
  console.log("Automation starting...");
  const browser = await chromium.launch();
  const page = await browser.newPage(); 
  await page.goto(link);
  //create a new page object with the link in config.js
  console.log("visiting " + link);

  //read from csv and load as input
  let rows = await readInput();
  let input = rows[0];

  //setup
  let questionIndex = 0;
  let hasSubmitButton = await page.locator('[data-automation-id="submitButton"]').isVisible();
  let isFinalPage = false;
  
  while(!isFinalPage){
    //get the total number of questions on a page
    const questions = await page.locator('[data-automation-id="questionItem"]').all();
    console.log("There are " + questions.length + " questions on this page.");
    console.log("Filling in questions...");

    //for each question on the page, fill in the input as provided by the csv file
    try{
      for(let i = 0; i<questions.length; i++){
        let questionType = await findQuestionType(questions[i]);
        let curIndex = i + questionIndex;
        //check if input is valid
        let validInput = await validateInput(input[curIndex], questions[i], questionType);
        //fill in the input
        await handleInput(validInput,input[curIndex],questions[i],questionType,page);
        await page.waitForTimeout(delay);
      }
    }
    catch(error) {
      console.log("Something went wrong.");
      console.error(error);
    }
    questionIndex += questions.length;
    //check if there is a "Next button"
    const hasNextButton = await page.getByLabel('Next').isVisible();
    
    if(hasNextButton){
      //if there is a submit button, click it
        console.log("Navigating to the next page...");
        await page.getByLabel('Next').click();
    }
    if(hasSubmitButton){
      //if there is a submit button, last page has been reached
      console.log("Final Page reached...");
      isFinalPage = true;
    }
    hasSubmitButton = await page.locator('[data-automation-id="submitButton"]').isVisible();
  }

  //submit the form
  console.log("Submitting form...");

  //cleanup
  await browser.close();
  console.log("Closing form...");
  console.log("DONE");
})();