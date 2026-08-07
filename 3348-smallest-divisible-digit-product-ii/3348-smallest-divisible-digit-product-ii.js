/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */
var smallestNumber = function(num, t) {
    // Step 1: Prime factorization of t
    let req2 = 0, req3 = 0, req5 = 0, req7 = 0;
    let temp = t;
    while (temp % 2 === 0) { req2++; temp /= 2; }
    while (temp % 3 === 0) { req3++; temp /= 3; }
    while (temp % 5 === 0) { req5++; temp /= 5; }
    while (temp % 7 === 0) { req7++; temp /= 7; }
    if (temp > 1) return "-1"; // Invalid prime factor >= 11

    // Step 2: DP precomputation for required 2s and 3s
    let dp = Array(50).fill(0).map(() => Array(31).fill(Infinity));
    dp[0][0] = 0;
    
    function getDP(i, j) {
        if (i < 0) i = 0;
        if (j < 0) j = 0;
        return dp[i][j];
    }
    
    // DP transition mapping digit possibilities (2, 3, 4, 6, 8, 9)
    for (let i = 0; i <= 46; i++) {
        for (let j = 0; j <= 29; j++) {
            if (i === 0 && j === 0) continue;
            let res = Infinity;
            res = Math.min(res, getDP(i - 1, j) + 1);       // Digit 2 (one 2)
            res = Math.min(res, getDP(i, j - 1) + 1);       // Digit 3 (one 3)
            res = Math.min(res, getDP(i - 2, j) + 1);       // Digit 4 (two 2s)
            res = Math.min(res, getDP(i - 1, j - 1) + 1);   // Digit 6 (one 2, one 3)
            res = Math.min(res, getDP(i - 3, j) + 1);       // Digit 8 (three 2s)
            res = Math.min(res, getDP(i, j - 2) + 1);       // Digit 9 (two 3s)
            dp[i][j] = res;
        }
    }

    let n = num.length;
    let pref2 = new Int32Array(n + 1);
    let pref3 = new Int32Array(n + 1);
    let pref5 = new Int32Array(n + 1);
    let pref7 = new Int32Array(n + 1);
    let first_zero = -1;

    // Primes given by each digit index
    let v2 = [0, 0, 1, 0, 2, 0, 1, 0, 3, 0];
    let v3 = [0, 0, 0, 1, 0, 0, 1, 0, 0, 2];
    let v5 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
    let v7 = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0];

    // Compute prefix products and trace 0s
    for (let i = 0; i < n; i++) {
        let d = num.charCodeAt(i) - 48;
        if (d === 0 && first_zero === -1) first_zero = i;
        pref2[i + 1] = pref2[i] + v2[d];
        pref3[i + 1] = pref3[i] + v3[d];
        pref5[i + 1] = pref5[i] + v5[d];
        pref7[i + 1] = pref7[i] + v7[d];
    }

    // Checking if num itself perfectly validates all requirements
    if (first_zero === -1 && pref2[n] >= req2 && pref3[n] >= req3 && pref5[n] >= req5 && pref7[n] >= req7) {
        return num;
    }

    // Step 3: Find the rightmost digit to increase
    let start_i = first_zero === -1 ? n - 1 : first_zero;
    let best_i = -1;
    let best_d = -1;

    for (let i = start_i; i >= 0; i--) {
        let d = num.charCodeAt(i) - 48;
        for (let next_d = d + 1; next_d <= 9; next_d++) {
            let cur2 = pref2[i] + v2[next_d];
            let cur3 = pref3[i] + v3[next_d];
            let cur5 = pref5[i] + v5[next_d];
            let cur7 = pref7[i] + v7[next_d];
            
            let rem2 = Math.max(0, req2 - cur2);
            let rem3 = Math.max(0, req3 - cur3);
            let rem5 = Math.max(0, req5 - cur5);
            let rem7 = Math.max(0, req7 - cur7);
            
            // Check if suffix length constraints provide enough space
            if (rem5 + rem7 + getDP(rem2, rem3) <= n - 1 - i) {
                best_i = i;
                best_d = next_d;
                break;
            }
        }
        if (best_i !== -1) break;
    }

    let res = [];
    
    // Step 4: Suffix mapping and construction
    if (best_i !== -1) {
        // Option A: We can find a solution modifying a character retaining the original length
        for (let i = 0; i < best_i; i++) res.push(num[i]);
        res.push(String.fromCharCode(best_d + 48));
        
        let cur2 = pref2[best_i] + v2[best_d];
        let cur3 = pref3[best_i] + v3[best_d];
        let cur5 = pref5[best_i] + v5[best_d];
        let cur7 = pref7[best_i] + v7[best_d];
        
        for (let i = best_i + 1; i < n; i++) {
            for (let c = 1; c <= 9; c++) {
                let n2 = cur2 + v2[c], n3 = cur3 + v3[c], n5 = cur5 + v5[c], n7 = cur7 + v7[c];
                let rem2 = Math.max(0, req2 - n2), rem3 = Math.max(0, req3 - n3), rem5 = Math.max(0, req5 - n5), rem7 = Math.max(0, req7 - n7);
                if (rem5 + rem7 + getDP(rem2, rem3) <= n - 1 - i) {
                    res.push(String.fromCharCode(c + 48));
                    cur2 = n2; cur3 = n3; cur5 = n5; cur7 = n7;
                    break;
                }
            }
        }
    } else {
        // Option B: No solution handles identically sized `num`. Form minimum string +1 length.
        let cur2 = 0, cur3 = 0, cur5 = 0, cur7 = 0;
        let target_len = Math.max(n + 1, req5 + req7 + getDP(req2, req3));
        for (let i = 0; i < target_len; i++) {
            for (let c = 1; c <= 9; c++) {
                let n2 = cur2 + v2[c], n3 = cur3 + v3[c], n5 = cur5 + v5[c], n7 = cur7 + v7[c];
                let rem2 = Math.max(0, req2 - n2), rem3 = Math.max(0, req3 - n3), rem5 = Math.max(0, req5 - n5), rem7 = Math.max(0, req7 - n7);
                if (rem5 + rem7 + getDP(rem2, rem3) <= target_len - 1 - i) {
                    res.push(String.fromCharCode(c + 48));
                    cur2 = n2; cur3 = n3; cur5 = n5; cur7 = n7;
                    break;
                }
            }
        }
    }

    return res.join('');
};