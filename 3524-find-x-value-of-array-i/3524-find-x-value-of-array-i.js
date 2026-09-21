/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultArray = function(nums, k) {
    // Array to store the total counts for each remainder x
    let ans = new Array(k).fill(0);
    // Array to store the counts of subarray products ending at the previous index
    let dp = new Array(k).fill(0);
    
    for (let i = 0; i < nums.length; i++) {
        let val = nums[i] % k;
        let next_dp = new Array(k).fill(0);
        
        // Extend existing subarrays ending at index i - 1
        for (let x = 0; x < k; x++) {
            if (dp[x] > 0) {
                let next_val = (x * val) % k;
                next_dp[next_val] += dp[x];
            }
        }
        
        // Start a new subarray of length 1 starting and ending at index i
        next_dp[val] += 1;
        
        // Add the counts to our total answer tally and update dp for the next iteration
        for (let x = 0; x < k; x++) {
            ans[x] += next_dp[x];
            dp[x] = next_dp[x];
        }
    }
    
    return ans;
};