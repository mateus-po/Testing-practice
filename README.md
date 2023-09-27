# Testing-practice

Repository contains solutions to two testing practice tasks. Both focus on developing testing automation skills.

## Task 1.

This task focues on building test cases for an algorythm, that finds the length of the longest substring without repeating characters in given string.

Test cases can be found in [testDataset.json](./testDataset.json) JSON file. Each test case follow the pattern:
+ **input** - here can be found string that will be tested
+ **output** - provides correct answer for given input
+ **explanation** - gives explanation to the test case, tells what is tested

Furthermore, the JavaScript file [longestSubstring.js](./longestSubstring.js) provides algorythm that finds the length of the longest substring without repeating characters. File [longestSubstring.test.js](./longestSubstring.test.js) allows to test the algorythm using the dataset with provided test cases.

Testing is performed using [npm Jest module](https://www.npmjs.com/package/jest).

## Task 2.

Task 2. focuses on testing login UI automation.

Testing [sample login UI](http://uitestingplayground.com/sampleapp) is done in [loginUI.test.js](./loginUI.test.js). As a testing framework it also uses Jest. Additionally it uses Puppeteer module to automatically navigate the page.

# Used technologies and programming languages

- Jest
- Puppeteer
- JavaScript

# Running the tests
1. First you need to have Node.js installed (for example from [here](https://nodejs.org/en/download)).
2. Open command line, go to the project folder and run: 
```
npm install
```
This will install all the dependencies that are used in the project.

3. Running tests from the Task 1:
```
npm test ./longestSubstring.test.js
```
Screenshot of successfully ran tests:
![Screenshot of the tests of longestSubstring.js](screenshots/longestSubstring_test_screenshot.PNG)

4. Running tests from the Task 2:
```
npm test ./loginUI.test.js
```
Screenshot of successfully ran tests:
![Screenshot of the tests of loginUI.js](screenshots/loginUI_test_screenshot.PNG)
