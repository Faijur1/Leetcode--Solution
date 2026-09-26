/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function(s, knowledge) {
    // 1. Convert knowledge to a Map for O(1) key lookups
    const knowledgeMap = new Map(knowledge);
    
    // 2. Use an array to build the result string for better performance
    let result = [];
    let currentKey = "";
    let insideBracket = false;
    
    // 3. Iterate through the string exactly once
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char === '(') {
            insideBracket = true;
            currentKey = ""; // Reset the key builder
        } else if (char === ')') {
            insideBracket = false;
            // Check if the key exists in our map, else append '?'
            if (knowledgeMap.has(currentKey)) {
                result.push(knowledgeMap.get(currentKey));
            } else {
                result.push('?');
            }
        } else {
            if (insideBracket) {
                // We are reading a key, append to currentKey
                currentKey += char;
            } else {
                // We are outside brackets, append directly to result
                result.push(char);
            }
        }
    }
    
    return result.join('');
};