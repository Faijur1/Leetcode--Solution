/**
 * @param {number} n
 * @return {number}
 */
var countCommas = function(n) {
    let totalCommas = 0;
    let limit = 1000;
    
    // Add commas for thousands, millions, billions, etc.
    while (n >= limit) {
        totalCommas += (n - limit + 1);
        limit *= 1000;
    }
    
    return totalCommas;
};