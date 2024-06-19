

## Installation

Clone the repo and install dependencies with the following command:

```bash
npm install
```
Detailed installation instructions can be found here:

[https://playwright.dev/docs/intro#installing-playwright](https://playwright.dev/docs/intro#installing-playwright)

## Setup
Under /config/config.js: 

- Change the URL of link to the desired form link.
- Change the value of delay to the desired delay between each question.
- Change the values of defaultValues to the desired values (explained in #default-values)
- Change the value of inputType to the corresponding Input Type (explained in #input-type)

Under /input
- Add your correctly formatted csv file titled input.csv
## Running 
Run the program as you would any other playwright test, this is typically done with the command:
```bash
npx playwright test
```
To view the execution at every step, you may open the UI panel with
```bash
npx playwright test --ui
```
## Question Types:
There are 9 possible question types on any given office form, referred to as follows:
- **MCQ:** Multiple Choice, choose 1 option out of N
- **MRQ:** Multiple Response, choose a number of options out of N
- **DROPDOWN:** Choose 1 response from the dropdown list provided
- **OEQ:** Open Ended, provide a short/long written response 
- **RATE:** provide a score from 1 to N
- **REC:** provide a score from 1 to N
- **DATE:** provide a calendar date
- **RANK:** Rank N options from 1 to N
- **LIKERT:** Rate N sub-questions from 1 to K

## Input Format
The input provided to each of these questions must follow a certain format for the script to be able to fill in the form with the corresponding value. The specifications are as follows:
- **MCQ:** Must be an integer within range of 1 to N where N is the number of options, or a string that exactly matches a possible option.
- **MRQ:** Must be list of integers within range of 1 to N  where N is the number of options.
- **DROPDOWN:** Must be a string that exactly matches a possible response .
- **OEQ:** Must be a string.
- **RATE:** Must be an integer within range of 1 to N where N is the highest possible score.
- **REC:** Must be an integer within range of 1 to N where N is the highest possible score.
- **DATE:** Must be a string that follows the regex patter dd/mm/yyyy
- **RANK:** Must be a list  of integers such that there are exact N unique numbers from 1 to N, where N is the number of options to rank.
- **LIKERT:** Must be a list of N integers, such that each integer is in the range of 1 to K, where N is the number of subquestions and K is the number of options per subquestion.
## Default Values
This will be the default input provided to a question if the input obtained from the csv file is invalid or missing.

**Note:** All questions of the same type will have the same default input. 

## Input Type
There are 2  input types:

**Currently only Type 1 is supported.**

Type 1: Sequentially ordered input. 

|input 1|input 2|input 3| 

Type 2: Unordered paired question/input.

|question 2|question 3|question 1| 

|input 2|input 3|input 1|
