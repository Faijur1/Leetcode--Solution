/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    // Array to store the frequency of each of the 26 lowercase English letters
    const counts = new Array(26).fill(0);
    
    for (let i = 0; i < word.length; i++) {
        // 'a'.charCodeAt(0) is 97
        counts[word.charCodeAt(i) - 97]++;
    }
    
    // Sort the frequencies in descending order
    counts.sort((a, b) => b - a);
    
    let totalPushes = 0;
    
    // Iterate through the sorted frequencies
    for (let i = 0; i < 26; i++) {
        // If there are no more characters, we can stop early
        if (counts[i] === 0) break;
        
        // Calculate the number of pushes needed for this character
        // i / 8 will be 0 for the first 8, 1 for the next 8, etc.
        const pushesRequired = Math.floor(i / 8) + 1;
        
        totalPushes += counts[i] * pushesRequired;
    }
    
    return totalPushes;
};