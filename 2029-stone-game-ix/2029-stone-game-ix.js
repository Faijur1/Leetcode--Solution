/**
 * @param {number[]} stones
 * @return {boolean}
 */
var stoneGameIX = function(stones) {
    // Array to hold the counts of numbers with modulo 3 equal to 0, 1, and 2
    const counts = [0, 0, 0];
    
    for (let i = 0; i < stones.length; i++) {
        counts[stones[i] % 3]++;
    }
    
    // If the count of multiples of 3 is even
    if (counts[0] % 2 === 0) {
        // Alice wins if there is at least one 1 and at least one 2 available
        return counts[1] > 0 && counts[2] > 0;
    } else {
        // If the count of multiples of 3 is odd
        // Alice wins only if the difference between 1s and 2s is greater than 2
        return Math.abs(counts[1] - counts[2]) > 2;
    }
};