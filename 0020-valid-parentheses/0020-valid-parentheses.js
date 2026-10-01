/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    
    // Hash map to keep track of matching brackets
    const bracketMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        // If the character is a closing bracket
        if (bracketMap[char]) {
            // Pop the top element from stack, or assign a dummy value if empty
            const topElement = stack.length === 0 ? '#' : stack.pop();
            
            // If the popped element doesn't match the corresponding opening bracket, it's invalid
            if (topElement !== bracketMap[char]) {
                return false;
            }
        } else {
            // If it's an opening bracket, push to the stack
            stack.push(char);
        }
    }
    
    // If the stack is empty at the end, all brackets were successfully matched
    return stack.length === 0;
};