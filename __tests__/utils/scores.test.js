const scoreCandidate = require('../../utils/scores.js');

const reqs = {
    genders: 'male',
    professionalJobTitles: {testSubject: true},
    professionalIndustry: {
        fizz: true,
        buzz: true, 
        bazz: true,
    },
    cities: [
        {   
            location: {
                city: 'city1',
                location: {
                    latitude: 1,
                    longitude: 1
                }
            }
        },
        {   
            location: {
                city: 'city2',
                location: {
                    latitude: 2,
                    longitude: 2
                }
            }
        },
    ]
}

const test1 = {
    firstName: 'dave',
    gender: 'male',
    jobTitle: 'testSubject',
    industry: 'fizz,bazz,Information Technology and Services,Computer Software,Graphic Design,Design,Logistics and Supply Chain',
    latitude: 1.2,
    longitude: 1.2
}
const test2 = {
    firstName: 'shanda',
    gender: 'female',
    jobTitle: 'testSubject',
    industry: '',
    latitude: 2.8,
    longitude: 2
}
const test3 = {
    firstName: 'bob',
    gender: 'male',
    jobTitle: 'testSubject',
    industry: 'fizz',
}

test('it should filter out empty respondent entries', () => {
    expect(scoreCandidate({}, reqs)).toEqual([0]);
});

test('it should filter out respondent entries missing location data', () => {
    expect(scoreCandidate(test3, reqs)).toEqual([0]);
});

test('it should filter out respondents that don\'t match specified gender', () => {
    expect(scoreCandidate(test2, reqs)).toEqual([0]);
    expect(scoreCandidate(test1, reqs)).not.toEqual([0]);
});

test('it should filter out respondents that don\'t match specified job title', () => {
    expect(scoreCandidate(test2, {...reqs, genders: "N/A"})).not.toEqual([0]);
    expect(scoreCandidate(test1, reqs)).not.toEqual([0]);
    expect(scoreCandidate(test3, reqs)).toEqual([0]);
});

test('it should give 25 points for each industry the respondent matches', () => {
    expect(scoreCandidate({...test1, latitude: 1, longitude: 1}, reqs)).toEqual([150, 0]);
    expect(scoreCandidate({...test2, latitude: 1, longitude: 1}, {...reqs, genders: 'N/A'})).toEqual([100,0]);
});

test('it should filter out respondents that are 100km from a program location', () => {
    expect(scoreCandidate({...test1, latitude: 10, longitude: 10}, reqs)).toEqual([0]);
    expect(scoreCandidate({...test2, latitude: -30, longitude: -30}, {...reqs, genders: 'N/A'})).toEqual([0]);
})


test('it should subtract 1 point/km from max 100points ', () => {
    let [score, distance] = scoreCandidate(test1, reqs)
    expect(Math.round(score)).toEqual(69+50);
    expect(Math.round(distance)).toEqual(31);
    
    [score, distance] = scoreCandidate(test2, {...reqs, genders: 'N/A'});
    expect(Math.round(score)).toEqual(11);
    expect(Math.round(distance)).toEqual(89);
})
