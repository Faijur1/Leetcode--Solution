/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function(nums, k) {
    let n = nums.length;
    let counts = new Map(); // Stores: integer -> number of subarrays of size k it appears in

    // Step 1: Iterate over every subarray of size k
    for (let i = 0; i <= n - k; i++) {
        // Extract the subarray and get its unique elements
        let subarray = nums.slice(i, i + k);
        let uniqueElements = new Set(subarray);
        
        // Increment the count for each unique element found in this subarray
        for (let val of uniqueElements) {
            counts.set(val, (counts.get(val) || 0) + 1);
        }
    }

    // Step 2: Find the largest integer that appears in exactly 1 subarray
    let maxVal = -1;
    for (let [val, count] of counts.entries()) {
        if (count === 1) {
            maxVal = Math.max(maxVal, val);
        }
    }

    return maxVal;
};