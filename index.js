/**
 * ************************************
 *
 * @module  index
 * @description 
 *
 * ************************************
 */

const path = require('path');
const getQualifiedCandidates = require('./utils/candidates.js');


const projectFilePath = path.resolve(__dirname, './assets/project.json');
const respondentDataPath = (__dirname, './assets/respondents_data_test.csv');

getQualifiedCandidates(projectFilePath, respondentDataPath);


