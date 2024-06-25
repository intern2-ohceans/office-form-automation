import { QUESTION_TYPES } from "../config/config.js";

//function to check if input type is correct with regard to the question

export async function validateInput( input, question, questionType) {
    if(typeof(input) != String){
        throw "invalid input";
      }
    let isRequired = await question.locator('[data-automation-id="requiredStar"]').first().isVisible();
    //return false if question is required but input is empty
    if(isRequired && !input){
        console.log(input);
        console.log("Input empty, required question...");
        return false;
    }

    /*
    switch(questionType){
        case QUESTION_TYPES.MCQ:
            let optionsMCQ = await question.locator('[data-automation-id="choiceItem"]').all();
            if(Number.isInteger(input)){
                if(input>optionsMCQ.length || 1>input){
                    return false;
                }
                else{
                    if(await question.getByRole('radio', { name: input, exact: true }).first().isVisible()){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            }
            else{

                return true;
            }
            break;

        case QUESTION_TYPES.MRQ:
            //valid only if input is an array of numbers in range
            //params = number of options
            //if multiple of the same option is chosen, i.e [1,1,1] STILL ACCEPTED, will be interpreted as [1]
            if(Array.isArray(input)){
                if(input.length > params){
                    return false;
                };
                for(let i = 0; i<params; i++){
                    if(input[i]>params || 1>input[i]){
                        return false;
                    }
                }
            }
            else{
                return false;
            }
            break;

        case QUESTION_TYPES.OEQ:
            //valid only if input is a string less than 4000 characters (the limit on the form)
            if(typeof(input) == String){
                if(input.length>4000){
                    return false;
                }
            }
            else{
                return true;
            }
            break;

        case QUESTION_TYPES.RATE:
            //valid only if input is a number in range
            //params = max rating
            if(Number.isInteger(input)){
                if(input>params || 1>input){
                    return false;
                }
            }
            else{
                return false;
            }
            break;

            case QUESTION_TYPES.REC:
                //valid only if input is a number in range
                //params = max rating
                if(Number.isInteger(input)){
                    if(input>params || 1>input){
                        return false;
                    }
                }
                else{
                    return false;
                }
                break;

        case QUESTION_TYPES.DATE:
            if(typeof(input) == String){
            }
            //valid only if input is a string in dd/mm/yyyy regex format
            break;

        case QUESTION_TYPES.RANK:
            //valid only if input is an array of exactly n non repeating numbers in range, where n is the number of options to rank
            break;

        case QUESTION_TYPES.LIKERT:
            break;
    }
    */
    return true;
  }