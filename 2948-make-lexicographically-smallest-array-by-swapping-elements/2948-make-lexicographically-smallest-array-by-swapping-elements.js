/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function(nums, limit) {
    const n = nums.length;
    
    // Create an array of indices [0, 1, 2, ..., n-1]
    const indices = Array.from({ length: n }, (_, i) => i);
    
    // Sort indices based on their corresponding values in nums in ascending order
    indices.sort((a, b) => nums[a] - nums[b]);
    
    const result = new Array(n);
    let i = 0;
    
    while (i < n) {
        let start = i;
        
        // Find the boundary of the current group
        while (i + 1 < n && nums[indices[i + 1]] - nums[indices[i]] <= limit) {
            i++;
        }
        
        // Extract the original indices for this group
        let groupIndices = indices.slice(start, i + 1);
        
        // Sort the original indices to know where to place the smallest values
        groupIndices.sort((a, b) => a - b);
        
        // Place the sorted values into the sorted indices in the result array
        for (let j = 0; j < groupIndices.length; j++) {
            result[groupIndices[j]] = nums[indices[start + j]];
        }
        
        i++;
    }
    
    return result;
};