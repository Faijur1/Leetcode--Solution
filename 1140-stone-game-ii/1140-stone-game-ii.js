/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const n = piles.length;
    
    // Compute suffix sums to quickly get the sum of remaining piles from index i
    const suffixSum = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        suffixSum[i] = suffixSum[i + 1] + piles[i];
    }
    
    // Memoization table
    const memo = Array.from({ length: n }, () => new Array(n + 1).fill(-1));
    
    function dp(i, M) {
        // If we can take all remaining piles
        if (i + 2 * M >= n) {
            return suffixSum[i];
        }
        
        // Return memoized result if available
        if (memo[i][M] !== -1) {
            return memo[i][M];
        }
        
        let maxStones = 0;
        
        // Try all possible moves X (1 <= X <= 2M)
        for (let X = 1; X <= 2 * M; X++) {
            let opponentStones = dp(i + X, Math.max(M, X));
            let currentStones = suffixSum[i] - opponentStones;
            maxStones = Math.max(maxStones, currentStones);
        }
        
        return memo[i][M] = maxStones;
    }
    
    return dp(0, 1);
};