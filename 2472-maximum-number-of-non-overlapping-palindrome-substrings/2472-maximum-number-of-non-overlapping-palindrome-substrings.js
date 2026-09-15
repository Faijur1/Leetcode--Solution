/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPalindromes = function(s, k) {
    const n = s.length;
    // dp[i] stores the max palindromes for prefix s[0...i-1]
    const dp = new Int32Array(n + 1);

    // Helper function to check if a substring is a palindrome
    const isPalindrome = (l, r) => {
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++;
            r--;
        }
        return true;
    };

    for (let i = 1; i <= n; i++) {
        // Option 1: Do not create a new palindrome ending at i - 1
        dp[i] = dp[i - 1];
        
        // Option 2: Check if the last `k` characters form a palindrome
        if (i >= k && isPalindrome(i - k, i - 1)) {
            dp[i] = Math.max(dp[i], dp[i - k] + 1);
        }
        
        // Option 3: Check if the last `k + 1` characters form a palindrome
        if (i >= k + 1 && isPalindrome(i - k - 1, i - 1)) {
            dp[i] = Math.max(dp[i], dp[i - k - 1] + 1);
        }
    }

    return dp[n];
};