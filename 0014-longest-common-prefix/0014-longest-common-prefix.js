/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return "";
    
    // Iterate through the characters of the first string
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        
        // Compare this character with the same position in all other strings
        for (let j = 1; j < strs.length; j++) {
            // If we reach the end of another string or find a mismatch
            if (i === strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    // If we make it through the whole first string, it is the common prefix
    return strs[0];
};