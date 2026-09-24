/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestIndex = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;
        let temp = nums[i];
        
        // Calculate the sum of the digits of nums[i]
        while (temp > 0) {
            sum += temp % 10;
            temp = Math.floor(temp / 10);
        }
        
        // If the digit sum matches the index, return it immediately
        // since we are iterating from smallest to largest index
        if (sum === i) {
            return i;
        }
    }
    
    // If no such index is found, return -1
    return -1;
};