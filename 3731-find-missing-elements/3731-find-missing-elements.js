/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findMissingElements = function(nums) {
    // Find the minimum and maximum values to define the range
    let min = Math.min(...nums);
    let max = Math.max(...nums);
    
    // Create a Set for O(1) lookups
    let numSet = new Set(nums);
    let missing = [];
    
    // Check every number in the range (exclusive of min and max since they are present)
    for (let i = min + 1; i < max; i++) {
        if (!numSet.has(i)) {
            missing.push(i);
        }
    }
    
    return missing;
};