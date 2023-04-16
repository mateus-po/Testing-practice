

function longestSubstring(testString, caseSensitive = true) {
    // function finds the length of the longest substring without repeating characters
    // and returns it as an interger
    // returns -1 if given argument is neither of string type or of type possible to convert to string

    // caseSensitive argument allows to choose whether function will or won't be case sensitive



    // first making sure that given argument is of string type
    // or of type easly converted to string
    if (typeof(testString) !== "string") {
        try {
            testString = testString.toString();
        } catch {
            return -1;
        }
    };

    // in case of case insensitivity, this line turns all capital letters to small letters
    if (!caseSensitive) testString = testString.toLowerCase();

    let characters_arr = []; // array of characters that are already in analyzed substring
    let longest = 0;

    for (character of testString) {
        // if character isn't already in the analyzed substring, we add it to the array
        if (!characters_arr.includes(character)) {
            characters_arr.push(character)
        }
        else {

            if (characters_arr.length > longest) {
                longest = characters_arr.length;
            }
            // deleting all characters that perecede the character that repeated (including the repeated)
            characters_arr = characters_arr.slice(characters_arr.indexOf(character)+1)
            characters_arr.push(character)

        }

    }
    // chcecking if the longest substring without repetition is at the end of string
    if (characters_arr.length > longest) longest = characters_arr.length
    return longest

}


