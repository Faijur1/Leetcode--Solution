/**
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function(nums1) {
    let min = Infinity;
    let hasOdd = false;
    
    // Find the minimum element and check if there are any odd elements
    for (let i = 0; i < nums1.length; i++) {
        let num = nums1[i];
        
        if (num < min) {
            min = num;
        }
        
        if (num % 2 !== 0) {
            hasOdd = true;
        }
    }
    
    // If there are no odd numbers, we are already at "all even", return true
    if (!hasOdd) {
        return true;
    }
    
    // Otherwise, we can only convert to "all odd" if the smallest number is odd
    return min % 2 !== 0;
};