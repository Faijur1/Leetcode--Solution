/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubsequence = function(nums) {
    let totalXor = 0;
    let allZero = true;
    
    for (let i = 0; i < nums.length; i++) {
        totalXor ^= nums[i];
        if (nums[i] !== 0) {
            allZero = false;
        }
    }
    
    // If there are no non-zero elements, it's impossible to get a non-zero XOR
    if (allZero) {
        return 0;
    }
    
    // If the XOR of the entire array is already non-zero, take the whole array
    if (totalXor !== 0) {
        return nums.length;
    }
    
    // If the total XOR is 0, excluding exactly one non-zero element makes the remaining XOR non-zero
    return nums.length - 1;
};