/**
 * ************************************
 *
 * @module  scores
 * @description
 *
 * @param {Object} respondent - 
 * @param {Object} reqs - 
 * @returns {number[]} with str param first letter capitalized
 *                   (i.e. str = 'hello' => 'Hello')
 * ************************************
*/

const {minDistance} = require('./distance.js');


const scoreCandidate = (respondent, reqs) => {
    const { 
        cities, 
        genders,
        jobTitles,
        industries, 
    } = reqs;
    
    let points = 0;
    if(genders !== "N/A" && respondent.gender !== genders.toLowerCase()) return [points]; 
   
    if(!jobTitles[respondent.jobTitle]) return [points];
    
    const distance = minDistance(cities, respondent);
    if(distance > 100) return [points];
    points += (100 - distance);

    if(respondent.industry) points += respondent.industry.split(',').filter(category => industries.hasOwnProperty(category)).length*10;
    //1 point for every m closest to location
    return [points, distance];
};

module.exports = scoreCandidate;