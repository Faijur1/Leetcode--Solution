/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function(stoneValue) {
    const n = stoneValue.length;
    
    // We only need to remember the results of the next 3 states
    // dp1 is dp[i+1], dp2 is dp[i+2], dp3 is dp[i+3]
    let dp1 = 0, dp2 = 0, dp3 = 0;

    for (let i = n - 1; i >= 0; i--) {
        let maxScore = -Infinity;
        let currentTake = 0;

        // Option 1: Take 1 stone
        currentTake += stoneValue[i];
        maxScore = Math.max(maxScore, currentTake - dp1);

        // Option 2: Take 2 stones
        if (i + 1 < n) {
            currentTake += stoneValue[i + 1];
            maxScore = Math.max(maxScore, currentTake - dp2);
        }

        // Option 3: Take 3 stones
        if (i + 2 < n) {
            currentTake += stoneValue[i + 2];
            maxScore = Math.max(maxScore, currentTake - dp3);
        }

        // Shift the DP array states for the next iteration
        dp3 = dp2;
        dp2 = dp1;
        dp1 = maxScore;
    }

    // dp1 now holds the maximum score difference Alice can achieve starting at index 0
    if (dp1 > 0) return "Alice";
    if (dp1 < 0) return "Bob";
    return "Tie";
};