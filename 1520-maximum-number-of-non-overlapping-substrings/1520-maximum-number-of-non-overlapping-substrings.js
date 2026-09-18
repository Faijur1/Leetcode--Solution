/**
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function(s) {
    const left = new Array(26).fill(-1);
    const right = new Array(26).fill(-1);
    const n = s.length;
    
    // Step 1: Find the first and last occurrence of each character
    for (let i = 0; i < n; i++) {
        const charCode = s.charCodeAt(i) - 97;
        if (left[charCode] === -1) {
            left[charCode] = i;
        }
        right[charCode] = i;
    }
    
    const intervals = [];
    
    // Step 2: Find all valid substring intervals
    for (let i = 0; i < 26; i++) {
        if (left[i] === -1) continue;
        
        let L = left[i];
        let R = right[i];
        let isValid = true;
        
        // Expand the right boundary if inner characters appear further right
        for (let j = L; j <= R; j++) {
            const currCode = s.charCodeAt(j) - 97;
            
            // If a character's first occurrence is before L, 
            // a valid substring cannot start at L.
            if (left[currCode] < L) {
                isValid = false;
                break;
            }
            R = Math.max(R, right[currCode]);
        }
        
        if (isValid) {
            intervals.push([L, R]);
        }
    }
    
    // Step 3: Sort intervals by end time ascending (greedy approach)
    // If end times are equal, sort by start time descending (shorter length)
    intervals.sort((a, b) => {
        if (a[1] !== b[1]) return a[1] - b[1];
        return b[0] - a[0]; 
    });
    
    // Step 4: Pick non-overlapping intervals
    const result = [];
    let prevR = -1;
    
    for (const [L, R] of intervals) {
        if (L > prevR) {
            result.push(s.substring(L, R + 1));
            prevR = R;
        }
    }
    
    return result;
};