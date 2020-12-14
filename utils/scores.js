/**
 * ************************************
 *
 * @module  scores
 * @description function used to filter out invalid candidates (based on gender and job title, scores of 
 *              0 points are ignored by the candidate matching algorithm), and then assign points based 
 *              on their minimum distance and matching industries:
 *                  - 1 pt/km subtracted for every km of distance (max: 100 pts)
 *                  - 25 pts/industry matched 
 *
 * @param {Object} respondent - an object representing a given row in the respondents data csv file
 * @param {Object} reqs - program requirements 
 * @returns {number[]} containing a candidate's points and minimum distance (if qualified)
 *                   
 * ************************************
*/

const {minDistance} = require('./distance.js');


const scoreCandidate = (respondent,  { cities, genders, professionalJobTitles, professionalIndustry }) => {
    //filter out empty or bad respondent entries
    if(!Object.keys(respondent).length || !respondent.latitude || !respondent.longitude) return [0];
    
    let points = 0;
    
    //if applicable, filter out candidates that do not have a matching gender or job title
    if(genders !== 'N/A' && respondent.gender !== genders.toLowerCase()) return [points]; 
    if(professionalJobTitles !== 'N/A' && !professionalJobTitles[respondent.jobTitle]) return [points];
    
    
    //assign points based on distance, candidates greater than 100km away receive 0 points
    const distance = minDistance(cities, respondent);
    if(distance > 100) return [points];
    points += (100 - distance);
    //candidate receives 25 points for every matched industry
    if(professionalIndustry !== 'N/A' && respondent.industry) points += respondent.industry.split(',').filter(category => professionalIndustry.hasOwnProperty(category)).length*25;

    return [points, distance];
};

module.exports = scoreCandidate;