/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numberOfSets = function(n, k) {
    const MOD = 1000000007n;
    
    // N is the total virtual points available, K is the points we need to pick
    const N = BigInt(n + k - 1);
    const K = BigInt(2 * k);

    // If we need to pick more points than available, it's impossible
    if (K > N) return 0;

    // Helper function for modular exponentiation: (base^exp) % MOD
    const modPow = function(base, exp) {
        let res = 1n;
        base = base % MOD;
        while (exp > 0n) {
            if (exp % 2n === 1n) res = (res * base) % MOD;
            exp = exp / 2n;
            base = (base * base) % MOD;
        }
        return res;
    };

    // Calculate factorials up to N
    let factN = 1n;
    for (let i = 1n; i <= N; i++) {
        factN = (factN * i) % MOD;
    }

    let factK = 1n;
    for (let i = 1n; i <= K; i++) {
        factK = (factK * i) % MOD;
    }

    let factNK = 1n;
    for (let i = 1n; i <= (N - K); i++) {
        factNK = (factNK * i) % MOD;
    }

    // Fermat's Little Theorem for modular inverse: a^(M-2) % M
    const invK = modPow(factK, MOD - 2n);
    const invNK = modPow(factNK, MOD - 2n);

    // nCr % MOD = (factN * invK * invNK) % MOD
    const ans = (factN * invK) % MOD * invNK % MOD;
    
    // Convert back to standard Number for LeetCode's expected return type
    return Number(ans);
};