const data = require("./testDataset.json")
const longestSubstring = require("./longestSubstring.js")


for ([index, testcase] of data.entries()) {
    test(`${index+1}. ${testcase.explanation}`, () => {
        expect(longestSubstring.longestSubstring(testcase.input)).toEqual(testcase.output);
    })
}