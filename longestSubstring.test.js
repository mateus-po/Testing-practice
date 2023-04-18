const data = require("./testDataset.json");
// getting JSON data via require already parses JSON text
const longestSubstring = require("./longestSubstring.js");

for ([index, testcase] of data.entries()) {
    test(`${index+1}. ${testcase.explanation}`, () => {
        expect(longestSubstring.longestSubstring(testcase.input)).toEqual(testcase.output);
    });
}