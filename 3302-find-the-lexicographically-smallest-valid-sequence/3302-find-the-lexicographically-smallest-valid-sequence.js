/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function(word1, word2) {
    const n = word1.length;
    const m = word2.length;
    
    // suf[i] stores the maximum length of a suffix of word2 
    // that can be found as a subsequence in word1[i...]
    const suf = new Int32Array(n + 1);
    
    // Fill the suffix array from right to left
    let j = m - 1;
    for (let i = n - 1; i >= 0; i--) {
        if (j >= 0 && word1[i] === word2[j]) {
            suf[i] = suf[i + 1] + 1;
            j--;
        } else {
            suf[i] = suf[i + 1];
        }
    }
    
    const res = [];
    let changed = false;
    j = 0; // Pointer for word2
    
    // Traverse from left to right to build the lexicographically smallest valid sequence
    for (let i = 0; i < n && j < m; i++) {
        if (word1[i] === word2[j]) {
            res.push(i);
            j++;
        } 
        // If characters don't match, check if we can use our single modification here
        else if (!changed && suf[i + 1] >= m - j - 1) {
            res.push(i);
            changed = true; // We used our 1 allowed change
            j++;
        }
    }
    
    // If we managed to match all characters of word2, return the sequence.
    // Otherwise, return an empty array as required.
    return res.length === m ? res : [];
};