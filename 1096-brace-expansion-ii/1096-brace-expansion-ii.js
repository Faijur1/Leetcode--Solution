/**
 * @param {string} expression
 * @return {string[]}
 */
var braceExpansionII = function(expression) {
    let res = new Set();
    let stack = [expression];
    let seen = new Set([expression]);

    while (stack.length > 0) {
        let curr = stack.pop();

        // Find the first closing brace '}'
        let right = curr.indexOf('}');
        
        // If there are no braces left, we have a fully expanded word
        if (right === -1) {
            res.add(curr);
            continue;
        }

        // Find the matching opening brace '{' for the first '}'
        let left = curr.lastIndexOf('{', right);
        
        // Extract the content inside the innermost braces
        let inside = curr.substring(left + 1, right);
        let parts = inside.split(',');

        // Everything before and after the innermost braces
        let prefix = curr.substring(0, left);
        let suffix = curr.substring(right + 1);

        // Expand the parts and construct the new intermediate strings
        for (let part of parts) {
            let nextStr = prefix + part + suffix;
            
            if (!seen.has(nextStr)) {
                seen.add(nextStr);
                stack.push(nextStr);
            }
        }
    }

    // Convert the result set to an array and sort it lexicographically 
    return Array.from(res).sort();
};