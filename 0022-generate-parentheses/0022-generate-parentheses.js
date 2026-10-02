/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const result = [];
    
    // Helper function for backtracking
    function backtrack(currentStr, openCount, closeCount) {
        // Base case: If the string length is 2 * n, it's a valid combination
        if (currentStr.length === n * 2) {
            result.push(currentStr);
            return;
        }
        
        // If we haven't reached the limit of open parentheses, we can add one
        if (openCount < n) {
            backtrack(currentStr + '(', openCount + 1, closeCount);
        }
        
        // If we have more open parentheses than close ones, we can close one
        if (closeCount < openCount) {
            backtrack(currentStr + ')', openCount, closeCount + 1);
        }
    }
    
    // Start with an empty string and 0 counts for both open and close brackets
    backtrack('', 0, 0);
    
    return result;
};