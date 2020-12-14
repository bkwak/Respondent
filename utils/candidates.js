/**
 * ************************************
 *
 * @module  candidates
 * @description  parses the respondent data from a csv file, matches it against the program requirements 
 *               found in a json file, and upon completion logs to the console an array containing the 
 *               matching respondents sorted by matching score
 *
 * @param {string} pjFile - absolute file path of the file containing program requirements
 * @param {string} respondentsFile - absolute file path of the spreadsheet containing respondent data
 * @returns {Object[]} containing the list of matching respondents sorted by matching score
 * ************************************
 */

const csv = require('csv-parser');
const fs = require('fs');
const scoreCandidate = require('./scores.js')


const getQualifiedCandidates = (pjFile, respondentFile) => {

//check for correct file types 
if(pjFile.slice(pjFile.length - 4) !== 'json') throw new Error('Project Data File must use .json extension');
if(respondentFile.slice(respondentFile.length - 3) !== 'csv') throw new Error('Respondent Data File must use .csv extension');

//array to hold our matched candidates
const chosenCandidates = [];

//extract relevant program criteria
const reqs = require(pjFile);
//if the program specifies job titles and industries to match, convert those arrays to objects to
//reduce lookup time from O(n) to O(1)
if(reqs.professionalJobTitles !== 'N/A') reqs.professionalJobTitles = reqs.professionalJobTitles.reduce((obj, key) => ({ ...obj, [key]: true}), {})
if(reqs.professionalIndustry !== 'N/A') reqs.professionalIndustry = reqs.professionalIndustry.reduce((obj, key) => ({ ...obj, [key]: true}), {})


fs.createReadStream(respondentFile)
  .pipe(csv({ separator: ',' }))
  .on('data', (row) => {
    //pass each row of data containing a candidate's information to the scoring function
    const [points, distance] = scoreCandidate(row, reqs);
    //matched candidates are added to the array
    if(points > 0) chosenCandidates.push({name: row.firstName, distance: `${distance} km`, points }); 
  })
  .on('end', () => {
    //sort the matched candidates in descending order and log the array to the console
    console.log(chosenCandidates.sort((a,b) => b.points - a.points));

    //if we wanted to display only enough candidates to satisfy the number of participants in a study:
    //  console.log(chosenCandidates.sort((a,b) => b.points - a.points).slice(0,reqs.numberOfParticipants))
  })
  .on('error', (e) => {
    console.log(e.stack);
  });

}

module.exports = getQualifiedCandidates;