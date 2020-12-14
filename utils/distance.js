/**
 * ************************************
 *
 * @module  distance
 * @description contains the function related to calculating distances
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
 * @description function used to calculate a respondent's minimum distance from any one program location.
 *              since respondent data contains errors in the 'city' column, the only way to find the 
 *              minimum distance is to calculate the distance between the respondent's lat/long and
 *              each program city's lat/long until the minimum value is obtained

 * @param {Object[]} cities - array containing program city information
 * @param {Object[]} respondent - object containing respondent information
 * @returns {number} in km
 *                   
 */

const minDistance = (cities, respondent ) => {
    //radius of the Earth in km
    const radius = 6357;
    let distance = Infinity;
    
    //if we find a city with 0km distance, we've found the minimum
    for(let i = 0; i < cities.length; i += 1) { 
        if(!distance) break;
        distance = Math.min(distance, calculateDistance(radians(cities[i].location.location.latitude), radians(cities[i].location.location.longitude), radians(respondent.latitude), radians(respondent.longitude)));
    };
    
    return parseFloat(distance.toFixed(2));

    
    function calculateDistance(cityLat, cityLong, lat, long) {
        //formula taken from wikipedia: https://en.wikipedia.org/wiki/Great-circle_distance
        const centralAngle = Math.acos(Math.sin(cityLat)*Math.sin(lat) + Math.cos(cityLat)*Math.cos(lat)*Math.cos(long - cityLong));
        return radius * centralAngle; 
    }
};



module.exports = {minDistance, radians};
