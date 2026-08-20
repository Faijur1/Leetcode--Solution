/**
 * @param {number[]} nums
 * @return {number[]}
 */
var resultArray = function(nums) {
    // Initialize the two arrays with the first and second elements
    let arr1 = [nums[0]];
    let arr2 = [nums[1]];
    
    // Iterate through the rest of the array starting from index 2
    for (let i = 2; i < nums.length; i++) {
        // Compare the last elements of arr1 and arr2
        if (arr1[arr1.length - 1] > arr2[arr2.length - 1]) {
            arr1.push(nums[i]);
        } else {
            arr2.push(nums[i]);
        }
    }
    
    // Concatenate arr2 to arr1 and return
    return arr1.concat(arr2);
};