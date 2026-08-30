/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumDeletions = function(nums) {
    const n = nums.length;
    if (n <= 1) return n;

    let minIndex = 0;
    let maxIndex = 0;

    // 1. Find the indices of the minimum and maximum elements
    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[minIndex]) {
            minIndex = i;
        }
        if (nums[i] > nums[maxIndex]) {
            maxIndex = i;
        }
    }

    // 2. Identify which index is closer to the front and which is closer to the back
    const i = Math.min(minIndex, maxIndex);
    const j = Math.max(minIndex, maxIndex);

    // 3. Calculate the deletions for all 3 scenarios
    const bothFromFront = j + 1; 
    const bothFromBack = n - i;
    const frontAndBack = (i + 1) + (n - j);

    // 4. Return the minimum of the three strategies
    return Math.min(bothFromFront, bothFromBack, frontAndBack);
};