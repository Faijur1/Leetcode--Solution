/**
 * @param {number} n
 * @return {boolean}
 */
var winnerSquareGame = function(n) {
    // dp[i] represents if the player starting with i stones can win
    const dp = new Array(n + 1).fill(false);
    
    // Evaluate every state from 1 to n
    for (let i = 1; i <= n; i++) {
        // Try removing every possible square number of stones
        for (let k = 1; k * k <= i; k++) {
            // If we can reach a state where the next player loses, 
            // the current player wins from state i.
            if (!dp[i - k * k]) {
                dp[i] = true;
                break; // No need to check other moves, a winning path is found
            }
        }
    }
    
    // Return whether Alice wins starting with n stones
    return dp[n];
};