const csv = require('csv-parser');
const fs = require('fs');

const winners = new Array(8);
// name, distance, matching score

const {
    cities, 
    professionalJobTitles: jobTitles, 
    professionalIndustry: industry, 
    education
} = JSON.parse(fs.readFileSync('./project.json'));

const coordinates = cities.map(city => city.location.location);
console.log(coordinates);


// [
//     'Developer',
//     'Software Engineer',
//     'Software Developer',
//     'Programmer',
//     'Java Developer',
//     'Java/J2EE Developer',
//     'Java Full Stack Developer',
//     'Java Software Engineer',
//     'Java Software Developer',
//     'Application Architect',
//     'Application Developer'
//   ]




fs.createReadStream('./respondents_data_test.csv')
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row);
    // generateScores(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

const generateScores = (respondent) => {
    if(!jobTitles.includes(respondent.jobTitle)) return;
    let points = 0;
    if(respondent.industry) {
        points += respondent.industry.split(',').filter(category => jobTitles.includes(category)).length;
    }
    points += minDistance(respondent.latitude, respondent.longitude);


    // \Delta \sigma =\arccos {\bigl (}\sin \phi _{1}\sin \phi _{2}+\cos \phi _{1}\cos \phi _{2}\cos(\Delta \lambda ){\bigr )}.}

const minDistance = (lat, long) => {
    const radius = 6357000;

    let distance = 0;
    coordinates.forEach( city => distance = Math.min(distance, calculateDistance(city.latitude, city.longitude, lat, long)));
    return distance;

    function calculateDistance(cityLat, cityLong, lat, long) {
        const centralAngle = 
        return radius * centralAngle 
    }


}

}
