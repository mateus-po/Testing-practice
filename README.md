# Internship-Task-OpenX

## Repository Descrition

Repository contains files with solution to recruitment tasks given in the file [OpenX - internship tasks (QA, Js).pdf](Internship-Task-OpenX/OpenX%20-%20internship%20tasks%20(QA,%20Js).pdf)

## Task 1.
Testcases can be found in [testDataset.json](Internship-Task-OpenX/testDataset.json) JSON file. Each test case follow the pattern:
+ **input** - here can be found string that will be tested
+ **output** - provides correct answer for given input
+ **explanation** - explains the test

Furthermore, the JavaScript file [longestSubstring.js](Internship-Task-OpenX/longestSubstring.js) provides algorythm that find the lenght of the longest substring without repeating characters. File [longestSubstring.test.js](Internship-Task-OpenX/longestSubstring.test.js) allows to test the algorythm using the dataset with provided test cases. It uses "Jest" testing module.

## Task 2.
Testing [sample login UI](http://uitestingplayground.com/sampleapp) is done in [loginUI.test.js](Internship-Task-OpenX/loginUI.test.js). As a testinf framework it also uses Jest module. Additionally it uses Puppeteer module to automatically navigate the page.

## Running the tests
1. Open command line terminal, go to the project folder and run: 
```
npm install
```
This will install all the dependencies that are used in the project (Namely Jest and Puppeteer)
2. To run tests pertinet to Task 1, run:
```
npm test ./longestSubstring.test.js
```
3. To run tests pertinet to Task 2, run:
```
npm test ./loginUI.test.js
```
