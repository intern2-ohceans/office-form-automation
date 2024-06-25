import {QUESTION_TYPES} from "../config/config.js";

//function to determine the question type based on the web elements present

export async function findQuestionType(question) {
    
    const values = await Promise.all([
        question.locator('[data-automation-id="choiceItem"]').first().isVisible(), //hasChoiceItem
        question.getByRole('radio').first().isVisible(), //hasRadioButton
        question.locator('[data-automation-id="textInput"]').first().isVisible(), //hasTextInput
        question.getByRole('button').first().isVisible(), //hasButton
        question.getByRole('combobox').first().isVisible(), //hasComboBox
        question.getByRole('radiogroup').first().isVisible(), //hasRadioGroup
        question.locator('[data-automation-id="likerTableHeadTr"]').first().isVisible(), //hasLikertTable
        question.locator('[data-automation-id="npsContainer"]').first().isVisible(), //hasNpsContainer
        question.getByRole('listbox').first().isVisible() //hasRankingContainer
    ]);

    const hasChoiceItem = values[0];
    const hasRadiobutton = values[1];
    const hasTextInput =  values[2];
    const hasButton = values[3];
    const hasComboBox = values[4];
    const hasRadioGroup = values[5];
    const hasLikertTable = values[6];
    const hasNpsContainer =  values[7];
    const hasRankingContainer = values[8];

    //["MCQ","MRQ","OEQ","OEQ","RATE","DATE","LIKERT","RANK", "DROPDOWN","REC"];

    if(hasChoiceItem){ //MCQ or MRQ
        if(hasRadiobutton){
            return QUESTION_TYPES.MCQ;
        }
        else{
            return QUESTION_TYPES.MRQ;
        }
    }
    else if(hasTextInput){ //OEQ
        return QUESTION_TYPES.OEQ;
    }
    else if(hasComboBox){ //date
        return QUESTION_TYPES.DATE;
    }
    else if(hasLikertTable){ //rate or likert
        return QUESTION_TYPES.LIKERT;
    }
    else if(hasNpsContainer){ //recommend
        return QUESTION_TYPES.REC;
    }
    else if(hasRankingContainer){ //rank
        return QUESTION_TYPES.RANK;
    }
    else if(hasButton){ //dropdown
        return QUESTION_TYPES.DROPDOWN;
    } 
    else if(hasRadioGroup){ //Rate
        return QUESTION_TYPES.RATE;
    }
    else{ //unknown
        return QUESTION_TYPES.UNKNOWN;
    }
}