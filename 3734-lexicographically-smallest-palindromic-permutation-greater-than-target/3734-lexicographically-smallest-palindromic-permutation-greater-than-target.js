/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexPalindromicPermutation = function(s, target) {
    const n = s.length;
    const freq = new Array(26).fill(0);
    
    // Count frequencies of all characters in s
    for (let i = 0; i < n; i++) {
        freq[s.charCodeAt(i) - 97]++;
    }
    
    let oddCount = 0;
    let midChar = "";
    const halfFreq = new Array(26).fill(0);
    
    // Verify if a palindrome can be formed and populate half-frequencies
    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2 !== 0) {
            oddCount++;
            midChar = String.fromCharCode(i + 97);
        }
        halfFreq[i] = Math.floor(freq[i] / 2);
    }
    
    // A palindrome can only have at most one character with an odd frequency
    if (oddCount > 1) return "";
    
    const halfN = Math.floor(n / 2);
    let M = 0;
    let tempFreq = [...halfFreq];
    
    // Find the maximum prefix of target's first half that we can exactly form
    for (let i = 0; i < halfN; i++) {
        let code = target.charCodeAt(i) - 97;
        if (tempFreq[code] > 0) {
            tempFreq[code]--;
            M++;
        } else {
            break;
        }
    }
    
    // Edge case: If we can exactly match the first half, check if the resulting 
    // full mirrored palindrome is already strictly greater than the target.
    if (M === halfN) {
        let exactFirstHalf = target.substring(0, halfN);
        let pal = exactFirstHalf + midChar + exactFirstHalf.split('').reverse().join('');
        if (pal > target) return pal;
    }
    
    // Check possible divergence index `i` in the first half from longest to shortest
    for (let i = Math.min(M, halfN - 1); i >= 0; i--) {
        let avail = [...halfFreq];
        
        // Remove characters needed to form the exact prefix up to index i - 1
        for (let j = 0; j < i; j++) {
            avail[target.charCodeAt(j) - 97]--;
        }
        
        let tCode = target.charCodeAt(i) - 97;
        let nextChar = -1;
        
        // Find the smallest available character strictly greater than target[i]
        for (let c = tCode + 1; c < 26; c++) {
            if (avail[c] > 0) {
                nextChar = c;
                break;
            }
        }
        
        // If we found a valid character to place at index i
        if (nextChar !== -1) {
            avail[nextChar]--; 
            
            // Build the optimal first half
            let firstHalf = target.substring(0, i) + String.fromCharCode(nextChar + 97);
            
            // Append the rest of the available characters in ascending order to minimize
            for (let c = 0; c < 26; c++) {
                while (avail[c] > 0) {
                    firstHalf += String.fromCharCode(c + 97);
                    avail[c]--;
                }
            }
            
            // Reconstruct and return the full palindrome string
            return firstHalf + midChar + firstHalf.split('').reverse().join('');
        }
    }
    
    return "";
};