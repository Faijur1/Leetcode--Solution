/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var shortestBeautifulSubstring = function(s, k) {
    const ones = [];
    
    // Step 1: Collect indices of all '1's in the string
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            ones.push(i);
        }
    }
    
    // Step 2: If there aren't enough '1's, return an empty string
    if (ones.length < k) {
        return "";
    }
    
    let minLen = Infinity;
    let ans = "";
    
    // Step 3: Check all valid substrings bounded by exactly k '1's
    for (let i = 0; i <= ones.length - k; i++) {
        const start = ones[i];
        const end = ones[i + k - 1];
        const currentLen = end - start + 1;
        
        const candidate = s.substring(start, end + 1);
        
        // Step 4: Update shortest length and lexicographically smallest string
        if (currentLen < minLen) {
            minLen = currentLen;
            ans = candidate;
        } else if (currentLen === minLen) {
            if (candidate < ans) {
                ans = candidate;
            }
        }
    }
    
    return ans;
};