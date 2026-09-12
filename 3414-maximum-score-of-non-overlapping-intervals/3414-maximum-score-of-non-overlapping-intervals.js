/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var maximumWeight = function(intervals) {
    const n = intervals.length;
    const arr = new Array(n);
    
    // Bundle the original indices before sorting
    for (let i = 0; i < n; i++) {
        arr[i] = { l: intervals[i][0], r: intervals[i][1], w: intervals[i][2], id: i };
    }
    
    // Sort intervals by their right endpoints in ascending order
    arr.sort((a, b) => a.r - b.r);

    // dp[i][k] will hold {w: totalWeight, id: [...sortedIndices]}
    const dp = Array.from({ length: n + 1 }, () => 
        Array.from({ length: 5 }, () => ({ w: 0, id: [] }))
    );

    for (let i = 1; i <= n; i++) {
        let left = 0, right = i - 1;
        let j = 0;
        const target = arr[i - 1].l;
        
        // Binary search to find the last interval that ends before current interval starts
        while (left <= right) {
            let mid = (left + right) >> 1;
            if (arr[mid].r < target) {
                j = mid + 1;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        for (let k = 1; k <= 4; k++) {
            const skip = dp[i - 1][k];
            const prev = dp[j][k - 1];
            
            // Build the inclusion candidate
            const takeId = prev.id.slice();
            takeId.push(arr[i - 1].id);
            takeId.sort((a, b) => a - b);
            
            const take = {
                w: prev.w + arr[i - 1].w,
                id: takeId
            };
            
            // Compare "take" vs "skip"
            if (take.w > skip.w) {
                dp[i][k] = take;
            } else if (take.w === skip.w) {
                let better = false;
                let minLen = Math.min(take.id.length, skip.id.length);
                let diff = false;
                
                // Compare arrays lexicographically
                for (let m = 0; m < minLen; m++) {
                    if (take.id[m] !== skip.id[m]) {
                        better = take.id[m] < skip.id[m];
                        diff = true;
                        break;
                    }
                }
                
                // If common elements are identical, smaller length implies a lexicographically smaller array
                if (!diff) {
                    better = take.id.length < skip.id.length;
                }
                
                dp[i][k] = better ? take : skip;
            } else {
                dp[i][k] = skip;
            }
        }
    }

    return dp[n][4].id;
};