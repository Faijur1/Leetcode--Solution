/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function(n, t) {
    let current = n;
    
    while (true) {
        let product = 1;
        let temp = current;
        
        // Calculate the product of the digits
        while (temp > 0) {
            product *= temp % 10;
            temp = Math.floor(temp / 10);
        }
        
        // Check if the product is divisible by t
        if (product % t === 0) {
            return current;
        }
        
        // Increment and test the next number
        current++;
    }
};