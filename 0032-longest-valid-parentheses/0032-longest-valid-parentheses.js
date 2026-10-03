/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let left = 0;
    let right = 0;
    let maxLength = 0;
    
    // Pass 1: Left to right
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            left++;
        } else {
            right++;
        }
        
        if (left === right) {
            maxLength = Math.max(maxLength, 2 * right);
        } else if (right > left) {
            // Invalid combination, reset counters
            left = 0;
            right = 0;
        }
    }
    
    left = 0;
    right = 0;
    
    // Pass 2: Right to left
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '(') {
            left++;
        } else {
            right++;
        }
        
        if (left === right) {
            maxLength = Math.max(maxLength, 2 * left);
        } else if (left > right) {
            // Invalid combination, reset counters
            left = 0;
            right = 0;
        }
    }
    
    return maxLength;
};