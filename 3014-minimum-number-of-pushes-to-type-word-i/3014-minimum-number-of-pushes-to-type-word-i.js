/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    let pushes = 0;
    let n = word.length;
    let multiplier = 1;
    
    // Process up to 8 keys at a time
    while (n > 0) {
        // Take up to 8 letters for the current multiplier level
        let lettersInCurrentRound = Math.min(8, n);
        
        // Add the cost for these letters
        pushes += lettersInCurrentRound * multiplier;
        
        // Decrease remaining letters and move to the next push cost
        n -= lettersInCurrentRound;
        multiplier++;
    }
    
    return pushes;
};