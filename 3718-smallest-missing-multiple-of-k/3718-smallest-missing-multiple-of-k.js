/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingMultiple = function(nums, k) {
    const numSet = new Set(nums);
    let multiple = k;
    
    // Increment by k until we find a multiple not in the set
    while (numSet.has(multiple)) {
        multiple += k;
    }
    
    return multiple;
};