import { defaultValues } from "../config/config";
export async function handleInput(validInput, input, question, questionType, page){
    switch(questionType){
        case "MCQ": //MCQ, choose 1 
          if(!validInput){
            input = defaultValues.MCQ;
          }
          let optionsMCQ = await question.locator('[data-automation-id="choiceItem"]').all();
          if(Number.isInteger(Number(input))){
            await optionsMCQ[Number(input)-1].getByRole('radio').check();
          }
          else if(typeof(input == String)){
            await question.getByRole('radio', { name: input, exact: true }).click();
          }
          break;

        case "MRQ": //MRQ, choose n 
          if(!validInput){
            input = defaultValues.MRQ;
          }
          let optionsMRQ = await question.locator('[data-automation-id="choiceItem"]').all();
          input = input.split(",");
          for(let j = 0; j<input.length; j++){
            if(Number.isInteger(Number(input[j]))){
              await optionsMRQ[Number(input[j])-1].getByRole('checkbox').check();
            }
            else if(typeof(input[j] == String)){
              await question.getByRole('checkbox', { name: input[j], exact: true }).check();
            }
          }
          break;

        case "DROPDOWN": //choose 1 option from dropdown
          await question.getByRole("button").click();
          if(!validInput){
            await page.getByRole('listbox').getByRole('option').first().click();
          }
          else{
            await page.getByRole('listbox').getByRole('option', { name: input, exact: true }).click();
          }
          break;

        case "OEQ": //short response
          if(!validInput){
            input = defaultValues.OEQ;
          }
          await question.locator('[data-automation-id="textInput"]').fill(input);
          break;

        case "RATE": // 5 star rating
          if(!validInput){
            input = defaultValues.RATE;
          }
          await question.getByRole('radiogroup').getByLabel(input.toString()).click();
          break;

        case "DATE": //choose date
          if(!validInput){
            input = defaultValues.DATE;
          }
          await question.getByRole('combobox').click();
          await question.getByRole('combobox').click();
          await question.getByRole('combobox').fill(input);
          await question.getByRole('combobox').press('Escape');
          break;

        case "RANK": //rank n choices 
          input = input.split(",");
          let optionsRanking = await question.getByRole('option').all();
          if(!validInput){
            await optionsRanking[0].dragTo(optionsRanking[1]);
            await optionsRanking[0].dragTo(optionsRanking[1]);
          }
          else{
            const insertedElements : number[] = [];
            for(let j = 0; j<optionsRanking.length; j++){
                input[j] = Number(input[j]);
                let shift = 0;
                for(let k = 0; k<insertedElements.length; k++){
                if(insertedElements[k]>input[j]){
                    shift+=1;
                }
                }
                await optionsRanking[input[j]+shift-1].dragTo(optionsRanking[j]);
                insertedElements.push(input[j]);
            }
          }
          break;

        case "LIKERT": // agree/disagree'
          let optionsLikert = await question.getByRole('radiogroup').all();
          for(let j = 0; j<optionsLikert.length; j++){
            input[j] = Number(input[j]);
            let buttons = await optionsLikert[j].getByRole('radio').all();
            if(!validInput){
              await buttons[0].check();
            }
            else{
              await buttons[input[j]-1].check();
            }
          }
          break;
          
        case "REC":
          if(!validInput){
            input = defaultValues.REC;
          }
          await question.locator('[data-automation-id="npsContainer"]')
          .locator('label').filter({ hasText: input.toString() }).click();
          break; 
      }
}