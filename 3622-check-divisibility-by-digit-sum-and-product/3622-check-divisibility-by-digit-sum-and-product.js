/**
 * @param {number} n
 * @return {boolean}
 */
var checkDivisibility = function(n) {
    let temp = n;
    let digitSum = 0;
    let digitProduct = 1;

    // Extract each digit one by one from right to left
    while (temp > 0) {
        let digit = temp % 10;
        digitSum += digit;
        digitProduct *= digit;
        
        // Remove the last digit from temp
        temp = Math.floor(temp / 10);
    }

    // Check if n is divisible by the combined total
    const total = digitSum + digitProduct;
    return n % total === 0;
};