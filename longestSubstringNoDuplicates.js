

function longestSubstring(testString){
    // function finds the length of the longest substring without repeating characters

    let characters = []
    let longest = 0;
    let current_begining = 0;

    for (const [index, character] of testString.split("").entries()) {
        // if in characterDict there's no currect character yet
        if (!characters.includes(character)) {
            characters.push(character)
        }
        else {
            let window = index - current_begining
            current_begining += characters.indexOf(character)+1
            
            
            characters = characters.slice(characters.indexOf(character)+1)
            characters.push(character)

            if (window > longest) {
                longest = window
            }

        }

    }
    if (longest < testString.length-current_begining) longest = testString.length-current_begining
    return longest

}

testingstrings = ["abcabcabc","aaaaaaaaaaaaaaabbbbbbbbbb", "qweertyyyyyyyyyy",
                  "yyyyyyyyyyyyyyyyyqwerty", "asdfasdfasgddsadgfqaweheiuof",
                  "asdbngoiaswoidnfoasidfqwertyuioplkjhgfdsazxcvbnmergjoidfjgoiedsop", "a","ab", "aa"]
for (str of testingstrings) console.log(longestSubstring(str))

// console.log(longestSubstring("abcabcabc"))