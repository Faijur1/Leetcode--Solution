/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function(arr, target) {
    const n = arr.length;
    // best[i] stores the minimum length of a valid sub-array ending at or before index i
    const best = new Array(n).fill(Infinity);
    
    let left = 0;
    let currentSum = 0;
    let minTotalLength = Infinity;

    for (let right = 0; right < n; right++) {
        currentSum += arr[right];

        // Shrink the window if the sum exceeds the target
        while (currentSum > target && left <= right) {
            currentSum -= arr[left];
            left++;
        }

        if (currentSum === target) {
            const currentLen = right - left + 1;
            
            // If there's a valid non-overlapping sub-array before our current left pointer,
            // calculate the sum of their lengths and update our minimum.
            if (left > 0 && best[left - 1] !== Infinity) {
                minTotalLength = Math.min(minTotalLength, currentLen + best[left - 1]);
            }
            // Temporarily store the length of this valid sub-array
            best[right] = currentLen;
        }

        // The best length at 'right' is the minimum of the best length ending here, 
        // or the best length seen so far (at right - 1).
        if (right > 0) {
            best[right] = Math.min(best[right], best[right - 1]);
        }
    }

    return minTotalLength === Infinity ? -1 : minTotalLength;
};