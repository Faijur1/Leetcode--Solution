/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVIII = function(stones) {
    
};/**
 * @param {number[]} stones
 * @return {number}
 */
var stoneGameVIII = function(stones) {
    const n = stones.length;
    
    // Transform the original array into a prefix sum array in-place
    for (let i = 1; i < n; i++) {
        stones[i] += stones[i - 1];
    }
    
    // Base case: If the player picks the very last possible prefix, 
    // they take everything, and the game ends (opponent gets 0 for subsequent moves).
    let dp = stones[n - 1];
    
    // Work backwards from the second to last available index down to 1
    // (index 0 isn't an option because a player must take x > 1 stones, meaning index 1 is the minimum)
    for (let i = n - 2; i >= 1; i--) {
        dp = Math.max(dp, stones[i] - dp);
    }
    
    return dp;
};