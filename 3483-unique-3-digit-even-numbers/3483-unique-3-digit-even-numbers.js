/**
 * @param {number[]} digits
 * @return {number}
 */
var totalNumbers = function(digits) {
    const uniqueNumbers = new Set();
    const n = digits.length;
    
    // Pick the first digit (hundreds place)
    for (let i = 0; i < n; i++) {
        // Cannot have leading zeros
        if (digits[i] === 0) continue; 
        
        // Pick the second digit (tens place)
        for (let j = 0; j < n; j++) {
            // Cannot reuse the exact same index
            if (i === j) continue; 
            
            // Pick the third digit (ones place)
            for (let k = 0; k < n; k++) {
                // Cannot reuse previously used indices
                if (i === k || j === k) continue; 
                
                // Must be an even number
                if (digits[k] % 2 === 0) {
                    const num = digits[i] * 100 + digits[j] * 10 + digits[k];
                    uniqueNumbers.add(num);
                }
            }
        }
    }
    
    // The size of the set represents the count of unique even numbers
    return uniqueNumbers.size;
};