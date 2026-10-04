/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function(s) {
    let low = 0;
    let high = 0;
    
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        
        if (char === '(') {
            low++;
            high++;
        } else if (char === ')') {
            low = Math.max(0, low - 1);
            high--;
        } else if (char === '*') {
            low = Math.max(0, low - 1); // Treat * as ) or empty
            high++;                    // Treat * as (
        }
        
        // If the maximum possible open parentheses is less than 0, 
        // it means we have too many closing parentheses.
        if (high < 0) {
            return false;
        }
    }
    
    // If the minimum possible open parentheses is 0, the string is valid.
    return low === 0;
};