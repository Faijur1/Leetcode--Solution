/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function(piles) {
    const n = piles.length;
    // dp[i][j] stores the max score difference for subarray piles[i...j]
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    
    // Base case: subarrays of length 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = piles[i];
    }
    
    // Build the DP table for subarrays of length 2 to n
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            // The current player wants to maximize their score minus the opponent's score
            dp[i][j] = Math.max(
                piles[i] - dp[i + 1][j], 
                piles[j] - dp[i][j - 1]
            );
        }
    }
    
    // If the difference is > 0, the first player (Alice) wins
    return dp[0][n - 1] > 0;
};