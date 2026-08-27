/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexGreaterPermutation = function(s, target) {
    const n = s.length;
    const s_freq = new Array(26).fill(0);
    
    // Count frequencies of all characters in s
    for (let i = 0; i < n; i++) {
        s_freq[s.charCodeAt(i) - 97]++;
    }
    
    // Find the maximum prefix of target that we can exactly form
    let M = 0;
    let temp_freq = [...s_freq];
    for (let i = 0; i < n; i++) {
        let code = target.charCodeAt(i) - 97;
        if (temp_freq[code] > 0) {
            temp_freq[code]--;
            M++;
        } else {
            break;
        }
    }
    
    // Check possible divergence index `i` from longest possible to shortest
    for (let i = Math.min(M, n - 1); i >= 0; i--) {
        let avail = [...s_freq];
        
        // Remove characters needed to form the exact prefix up to index i - 1
        for (let j = 0; j < i; j++) {
            avail[target.charCodeAt(j) - 97]--;
        }
        
        let t_code = target.charCodeAt(i) - 97;
        let next_char = -1;
        
        // Find the smallest available character strictly greater than target[i]
        for (let c = t_code + 1; c < 26; c++) {
            if (avail[c] > 0) {
                next_char = c;
                break;
            }
        }
        
        // If we found a valid character to place at index i
        if (next_char !== -1) {
            avail[next_char]--; // Use this character
            
            // Build the final resulting string
            let res = target.substring(0, i) + String.fromCharCode(next_char + 97);
            
            // Append the rest of the available characters in ascending order
            for (let c = 0; c < 26; c++) {
                while (avail[c] > 0) {
                    res += String.fromCharCode(c + 97);
                    avail[c]--;
                }
            }
            
            return res;
        }
    }
    
    return "";
};