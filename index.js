/**
 * ************************************
 *
 * @module  index
 * @description entry point- fixes absolute file paths of the program json data
 *              and respondent's csv data and passes them to the candidate matching algorithm
 *
 * ************************************
 */

const path = require('path');
const getQualifiedCandidates = require('./utils/candidates.js');


const projectFilePath = path.resolve(__dirname, './assets/project.json');
const respondentDataPath = (__dirname, './assets/respondents_data_test.csv');

getQualifiedCandidates(projectFilePath, respondentDataPath);


