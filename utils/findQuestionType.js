export async function findQuestionType(question) {
    
    let hasChoiceItem = await question.locator('[data-automation-id="choiceItem"]').first().isVisible();
    let hasTextInput =  await question.locator('[data-automation-id="textInput"]').first().isVisible();
    let hasButton = await question.getByRole('button').first().isVisible();
    let hasComboBox = await question.getByRole('combobox').first().isVisible();
    let hasRadioGroup = await question.getByRole('radiogroup').first().isVisible();
    let hasLikertTable = await question.locator('[data-automation-id="likerTableHeadTr"]').first().isVisible();
    let hasNpsContainer =  await question.locator('[data-automation-id="npsContainer"]').first().isVisible();
    let hasRankingContainer = await question.getByRole('listbox').first().isVisible();

    //["MCQ","MRQ","OEQ","OEQ","RATE","DATE","LIKERT","RANK", "DROPDOWN","REC"];

    if(hasChoiceItem){ //MCQ or MRQ
        let hasRadiobutton = await question.getByRole('radio').first().isVisible();
        if(hasRadiobutton){
            return "MCQ";
        }
        else{
            return "MRQ";
        }
    }
    else if(hasTextInput){ //OEQ
        return "OEQ";
    }
    else if(hasComboBox){ //date
        return "DATE";
    }
    else if(hasLikertTable){ //rate or likert
        return "LIKERT";
    }
    else if(hasNpsContainer){ //recommend
        return "REC";
    }
    else if(hasRankingContainer){ //rank
        return "RANK";
    }
    else if(hasButton){ //dropdown
        return "DROPDOWN";
    } 
    else if(hasRadioGroup){ //Rate
        return "RATE";
    }
    else{ //unknown
        return "ERROR";
    }
}