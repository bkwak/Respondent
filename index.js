const csv = require('csv-parser');
const fs = require('fs');

const winners = [];
const {
    cities, 
    professionalJobTitles: jobTitles, 
    professionalIndustry: industry, 
    education
} = JSON.parse(fs.readFileSync('./project.json'));

// console.log(industry);

fs.createReadStream('./respondents_data_test.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

const generateScores = (participant) => {



}
