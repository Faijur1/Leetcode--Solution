/**
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function(s) {
    const MOD = 1e9 + 7;
    
    // Array to store the number of distinct subsequences ending with each letter
    const end = new Array(26).fill(0);
    
    let total = 0;

    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i) - 97; // 97 is the ASCII for 'a'
        
        // (total + 1) generates all new combinations
        // We subtract end[charCode] to remove duplicate counts from previous occurrences
        // We add MOD before taking the modulo to handle JavaScript's negative modulo behavior
        const added = (total + 1 - end[charCode] + MOD) % MOD;
        
        // Update the counts
        end[charCode] = (end[charCode] + added) % MOD;
        total = (total + added) % MOD;
    }

    return total;
};