/**
 * ************************************
 *
 * @module  calculateDistance
 * @description 
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

//array to hold our top qualified candidates
const chosenCandidates = [];

//extract relevant program criteria
const reqs = require(pjFile);

reqs.jobTitles = reqs.professionalJobTitles.reduce((obj, key) => ({ ...obj, [key]: true}), {})
reqs.industries = reqs.professionalIndustry.reduce((obj, key) => ({ ...obj, [key]: true}), {})


// name, distance, matching score


// const coordinates = cities.map(city => {
//     return {
//         lat: radians(city.location.location.latitude),
//         long: radians(city.location.location.latitude)
//     }
// });

fs.createReadStream(respondentFile)
  .pipe(csv({ separator: ',' }))
  .on('data', (row) => {
    // console.log(row)
    const [points, distance] = scoreCandidate(row, reqs);
    if(points > 0) chosenCandidates.push({name: row.firstName, distance: `${distance} km`, points }); 
  })
  .on('end', () => {
    console.log(chosenCandidates.sort((a,b) => b.points - a.points));
  })
  .on('error', (e) => {
    console.log(e.stack);
  });

}

module.exports = getQualifiedCandidates;