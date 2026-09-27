/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    const n = s.length;
    const pair = new Array(n).fill(0);
    const stack = [];

    // Step 1: Pair up matching parentheses
    for (let i = 0; i < n; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else if (s[i] === ')') {
            const j = stack.pop();
            pair[i] = j;
            pair[j] = i;
        }
    }

    // Step 2: Traverse the string
    let result = [];
    let i = 0;
    let direction = 1; // 1 means going right, -1 means going left

    while (i < n) {
        if (s[i] === '(' || s[i] === ')') {
            // "Teleport" to the matching parenthesis and reverse direction
            i = pair[i];
            direction = -direction;
        } else {
            result.push(s[i]);
        }
        i += direction;
    }

    return result.join('');
};