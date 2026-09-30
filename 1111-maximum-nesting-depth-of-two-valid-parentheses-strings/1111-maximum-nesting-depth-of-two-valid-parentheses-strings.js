/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function(seq) {
    const result = [];
    let currentDepth = 0;
    
    for (let i = 0; i < seq.length; i++) {
        if (seq[i] === '(') {
            // Depth increases when we encounter an open parenthesis
            currentDepth++;
            result.push(currentDepth % 2);
        } else {
            // Assign based on the current depth before it closes/decreases
            result.push(currentDepth % 2);
            currentDepth--;
        }
    }
    
    return result;
};