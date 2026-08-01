/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    const n = nums.length;
    // dp[j] will store the maximum score difference for the subarray nums[i...j]
    const dp = [...nums]; 
    
    // We iterate backwards through the starting indices
    for (let i = n - 1; i >= 0; i--) {
        // We iterate forwards through the ending indices
        for (let j = i + 1; j < n; j++) {
            // Calculate the max difference between picking the left element vs the right element
            dp[j] = Math.max(
                nums[i] - dp[j],     // Pick left: nums[i] - difference from remaining array nums[i+1...j]
                nums[j] - dp[j - 1]  // Pick right: nums[j] - difference from remaining array nums[i...j-1]
            );
        }
    }
    
    // Player 1 wins if the maximum score difference from nums[0...n-1] is >= 0
    return dp[n - 1] >= 0;
};