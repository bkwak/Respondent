const csv = require('csv-parser');
const fs = require('fs');

const radians = (deg) => {
    return (deg * Math.PI) / 180;
}

const winners = [];
// name, distance, matching score

const {
    cities, 
    professionalJobTitles: jobTitles, 
    professionalIndustry: industries, 
    education
} = JSON.parse(fs.readFileSync('./project.json'));

const coordinates = cities.map(city => {
    return {
        lat: radians(city.location.location.latitude),
        long: radians(city.location.location.latitude)
    }
});

fs.createReadStream('./respondents_data_test.csv')
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row);
    generateScores(row);
  })
  .on('end', () => {
    winners.sort((a,b) => b.points - a.points);
    console.log(winners);
  });

const generateScores = (respondent) => {
    if(!jobTitles.includes(respondent.jobTitle)) return;
    let points = 0;
    if(respondent.industry) points += respondent.industry.split(',').filter(category => industries.includes(category)).length*10;
    //1 point for every m closest to location
    const distance = minDistance(respondent.latitude, respondent.longitude);
    // console.log(typeof distance);
    points += distance;
    console.log(typeof distance, typeof points)
    winners.push({name: respondent.firstName, points, distance});

};


const minDistance = (lat, long) => {
    const radius = 6357;

    let distance = Infinity;
    coordinates.forEach( city => distance = Math.min(distance, calculateDistance(city.lat, city.long, radians(lat), radians(long))/1000));
    return distance > 100 ? 0 : +distance.toFixed(2);

    function calculateDistance(cityLat, cityLong, lat, long) {
        const centralAngle = Math.acos(Math.sin(cityLat)*Math.sin(lat) + Math.cos(cityLat)*Math.cos(lat)*Math.cos(long - cityLong));
        return radius * centralAngle; 
    }
};

