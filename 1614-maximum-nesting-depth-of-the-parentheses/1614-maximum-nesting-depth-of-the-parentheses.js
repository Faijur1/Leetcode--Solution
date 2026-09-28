/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function(s) {
    let maxDepth = 0;
    let currentDepth = 0;
    
    for (let char of s) {
        if (char === '(') {
            currentDepth++;
            maxDepth = Math.max(maxDepth, currentDepth);
        } else if (char === ')') {
            currentDepth--;
        }
    }
    
    return maxDepth;
};