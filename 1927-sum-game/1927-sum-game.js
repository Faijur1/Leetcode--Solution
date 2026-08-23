/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {
    const n = num.length;
    let sum1 = 0, sum2 = 0;
    let q1 = 0, q2 = 0;

    // Process the first half
    for (let i = 0; i < n / 2; i++) {
        if (num[i] === '?') {
            q1++;
        } else {
            sum1 += parseInt(num[i], 10);
        }
    }

    // Process the second half
    for (let i = n / 2; i < n; i++) {
        if (num[i] === '?') {
            q2++;
        } else {
            sum2 += parseInt(num[i], 10);
        }
    }

    // If total '?' is odd, Alice gets the last move and always wins
    if ((q1 + q2) % 2 !== 0) {
        return true;
    }

    // Check if Bob's forced balance equals 0
    // If it doesn't, Alice wins (true)
    return (sum1 - sum2 + (q1 - q2) * 4.5) !== 0;
};