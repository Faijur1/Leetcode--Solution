/**
 * @param {number} n
 * @return {number}
 */
var countCommas = function(n) {
    let totalCommas = 0;
    let threshold = 1000;
    
    // Add commas for every group of 3 digits
    while (n >= threshold) {
        totalCommas += (n - threshold + 1);
        threshold *= 1000;
    }
    
    return totalCommas;
};