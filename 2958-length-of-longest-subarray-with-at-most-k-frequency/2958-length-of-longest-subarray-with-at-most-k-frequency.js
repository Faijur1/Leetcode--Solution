/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function(nums, k) {
    let maxLen = 0;
    let left = 0;
    const freq = new Map();
    
    for (let right = 0; right < nums.length; right++) {
        const num = nums[right];
        
        // Add the current number to our frequency map
        freq.set(num, (freq.get(num) || 0) + 1);
        
        // If the frequency of the current number exceeds k, 
        // shrink the window from the left until it's valid again.
        while (freq.get(num) > k) {
            const leftNum = nums[left];
            freq.set(leftNum, freq.get(leftNum) - 1);
            left++;
        }
        
        // Update the maximum length found so far
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};