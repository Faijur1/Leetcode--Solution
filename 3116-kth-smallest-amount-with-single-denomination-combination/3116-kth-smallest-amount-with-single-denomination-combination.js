/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {
    // 1. Sort and remove redundant coins (coins that are multiples of other coins)
    coins.sort((a, b) => a - b);
    let filtered = [];
    for (let c of coins) {
        if (!filtered.some(f => c % f === 0)) {
            filtered.push(c);
        }
    }
    coins = filtered;
    
    let n = coins.length;

    // Helper functions for Greatest Common Divisor and Least Common Multiple
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const lcm = (a, b) => (a / gcd(a, b)) * b;

    // 2. Precompute the LCM and the Inclusion-Exclusion sign for all 2^n - 1 subsets
    let pieData = [];
    for (let i = 1; i < (1 << n); i++) {
        let currentLcm = 1;
        let setBits = 0;
        
        for (let j = 0; j < n; j++) {
            if ((i & (1 << j)) !== 0) {
                currentLcm = lcm(currentLcm, coins[j]);
                setBits++;
            }
        }
        // Odd number of coins -> add (+1), Even number of coins -> subtract (-1)
        pieData.push({ val: currentLcm, sign: setBits % 2 === 1 ? 1 : -1 });
    }

    // 3. Binary Search for the k-th smallest amount
    let left = 1;
    let right = coins[0] * k; // The max possible answer
    let ans = right;

    while (left <= right) {
        // Note: left + right fits perfectly inside JavaScript's safe integer limit
        let mid = Math.floor((left + right) / 2);
        
        // Count how many amounts are <= mid
        let count = 0;
        for (let i = 0; i < pieData.length; i++) {
            count += Math.floor(mid / pieData[i].val) * pieData[i].sign;
        }

        // Adjust binary search window based on count
        if (count >= k) {
            ans = mid;
            right = mid - 1; // Try to find a smaller valid amount
        } else {
            left = mid + 1;
        }
    }

    return ans;
};