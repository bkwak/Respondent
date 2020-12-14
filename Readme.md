# Software Engineer Backend Technical Test

Task 1 - Matching

Matching Respondents With Projects (Paid Opportunities)
Central to the ----- platform is a matching algorithm that matches research participants with paid opportunities launched by researchers.
We have some respondents/participants data in a text file (respondents.csv attached) and data attributes we know about them (one respondent per line). We would like to evaluate whether they match (a good fit) with a project (paid opportunities) (project.json attached).
Write a matching score function that calculates their likelihood to be picked based on the following data points:

- Industry
- Job title
- Location (max 100km)

Write a program that will read the full list of respondents and output the ​names​, ​distance and matching score​ of matching respondents (within 100km), sorted by matching score.

Please refer to this ​Wikipedia Article​ to calculate the distance. Remember to convert degrees to radians when calculating the distance. Please include some unit tests to cover your code and functions.

# Instructions

- npm start: to run the program
- npm run test: to run all tests
