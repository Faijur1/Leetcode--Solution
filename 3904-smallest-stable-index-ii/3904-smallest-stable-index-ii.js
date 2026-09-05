/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function(nums, k) {
    const n = nums.length;
    
    // suffixMin[i] will store the minimum value in nums[i...n-1]
    const suffixMin = new Int32Array(n);
    
    // Build the suffix minimum array backwards
    suffixMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);
    }
    
    let currentMax = -Infinity;
    
    // Iterate forwards to keep track of the prefix maximum and evaluate the score
    for (let i = 0; i < n; i++) {
        currentMax = Math.max(currentMax, nums[i]);
        
        // Check if the current index is stable
        if (currentMax - suffixMin[i] <= k) {
            return i;
        }
    }
    
    return -1;
};