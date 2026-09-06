/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
    const m = s.length;
    const n = t.length;
    
    // Edge case: if t is longer than s, it's impossible to form t
    if (n > m) return 0;
    
    // dp[j] represents the number of ways to form t[0...j-1]
    const dp = new Array(n + 1).fill(0);
    
    // Base case: There is exactly 1 way to form an empty string t (by deleting all chars in s)
    dp[0] = 1;
    
    // Iterate through every character in string s
    for (let i = 1; i <= m; i++) {
        // Iterate backwards through string t to avoid overwriting previous states too early
        for (let j = n; j >= 1; j--) {
            // If the characters match, add the combinations from without the current character
            if (s[i - 1] === t[j - 1]) {
                dp[j] = dp[j] + dp[j - 1];
            }
        }
    }
    
    return dp[n];
};