/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function(stoneValue) {
    const n = stoneValue.length;
    
    // Prefix sum array for O(1) range sum queries
    const prefix = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + stoneValue[i];
    }
    
    // dp[i][j] stores the max score for subarray from index i to j
    // Using Int32Array for better performance and memory management in V8
    const dp = Array.from({ length: n }, () => new Int32Array(n).fill(0));
    
    // Loop for lengths of subarray from 2 to n
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            let maxScore = 0;
            
            // Try all possible split points k
            for (let k = i; k < j; k++) {
                let leftSum = prefix[k + 1] - prefix[i];
                let rightSum = prefix[j + 1] - prefix[k + 1];
                
                if (leftSum < rightSum) {
                    let score = leftSum + dp[i][k];
                    if (score > maxScore) maxScore = score;
                } else if (leftSum > rightSum) {
                    let score = rightSum + dp[k + 1][j];
                    if (score > maxScore) maxScore = score;
                } else { // leftSum === rightSum
                    let score = leftSum + Math.max(dp[i][k], dp[k + 1][j]);
                    if (score > maxScore) maxScore = score;
                }
            }
            dp[i][j] = maxScore;
        }
    }
    
    return dp[0][n - 1];
};