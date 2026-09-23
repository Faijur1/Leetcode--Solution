/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function(nums, x) {
    let totalSum = 0;
    for (let num of nums) {
        totalSum += num;
    }
    
    // We are looking for a subarray in the middle that sums to target
    let target = totalSum - x;
    
    // If the target is negative, all elements combined are still less than x
    if (target < 0) return -1;
    // If the target is exactly 0, we need to remove all elements
    if (target === 0) return nums.length;
    
    let left = 0;
    let currentSum = 0;
    let maxLen = -1;
    
    // Sliding window
    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        
        // Shrink the window from the left if our sum exceeds the target
        while (currentSum > target && left <= right) {
            currentSum -= nums[left];
            left++;
        }
        
        // If we hit the exact target, check if this is the longest valid window we've seen
        if (currentSum === target) {
            maxLen = Math.max(maxLen, right - left + 1);
        }
    }
    
    // If maxLen is still -1, no valid subarray was found.
    return maxLen === -1 ? -1 : nums.length - maxLen;
};