/**
 * ************************************
 *
 * @module  calculateDistance
 * @author
 * @date
 * @description 
 *
 * ************************************
 */

/**
 * @name radians
 * @param {number} deg 
 * @returns {number} input latitude or longitude in degrees converted to radians               
 */

const radians = (deg) => (deg * Math.PI) / 180;


 /**
 * @name minDistance
 * @param {number} lat - 
 * @param {number} lat - 
 * @returns {string} with str param first letter capitalized
 *                   (i.e. str = 'hello' => 'Hello')
 */

const minDistance = (cities, respondent ) => {
    // console.log(respondentLat, respondentLong)
    const radius = 6357;
    let distance = Infinity;
    
    for(let i = 0; i < cities.length; i += 1) { 
        if(!distance) break;
        distance = Math.min(distance, calculateDistance(radians(cities[i].location.location.latitude), radians(cities[i].location.location.longitude), radians(respondent.latitude), radians(respondent.longitude)));
    };
    
    return parseFloat(distance.toFixed(2));
    
    // cities.forEach( ({location: {location}}) => {
    // //     console.log()
    // //     if(Math.abs(location.latitude - respondentLat) + Math.abs(location.longitude - respondentLong) <= 1)
    //     distance = Math.min(distance, calculateDistance(radians(location.latitude), radians(location.longitude), radians(respondentLat), radians(respondentLong)));
    // });

    function calculateDistance(cityLat, cityLong, lat, long) {
        const centralAngle = Math.acos(Math.sin(cityLat)*Math.sin(lat) + Math.cos(cityLat)*Math.cos(lat)*Math.cos(long - cityLong));
        return radius * centralAngle; 
    }
};



module.exports = {minDistance, radians};
