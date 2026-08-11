/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function(nums) {
    // Step 1: Calculate the sum of the longest sequential prefix
    let sum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            sum += nums[i];
        } else {
            break; // Stop at the first non-sequential element
        }
    }
    
    // Step 2: Find the smallest missing integer >= sum
    const numSet = new Set(nums);
    
    while (numSet.has(sum)) {
        sum++;
    }
    
    return sum;
};