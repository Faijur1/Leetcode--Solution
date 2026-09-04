/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function(nums, k) {
    const n = nums.length;
    
    // Arrays to store the maximums up to index i and minimums from index i to n-1
    const prefMax = new Array(n);
    const suffMin = new Array(n);
    
    // Compute prefix maximums
    prefMax[0] = nums[0];
    for (let i = 1; i < n; i++) {
        prefMax[i] = Math.max(prefMax[i - 1], nums[i]);
    }
    
    // Compute suffix minimums
    suffMin[n - 1] = nums[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suffMin[i] = Math.min(suffMin[i + 1], nums[i]);
    }
    
    // Find the first index that satisfies the stability condition
    for (let i = 0; i < n; i++) {
        if (prefMax[i] - suffMin[i] <= k) {
            return i;
        }
    }
    
    // If no stable index exists
    return -1;
};