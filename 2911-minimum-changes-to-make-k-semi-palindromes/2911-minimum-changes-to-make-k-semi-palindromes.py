class Solution(object):
    def minimumChanges(self, s, k):
        """
        :type s: str
        :type k: int
        :rtype: int
        """
        n = len(s)
        
        # Precompute proper divisors for every possible substring length
        divisors = [[] for _ in range(n + 1)]
        for length in range(2, n + 1):
            for d in range(1, length):
                if length % d == 0:
                    divisors[length].append(d)
                    
        # Helper function to compute minimum changes to make s[i:j] a semi-palindrome
        def get_cost(i, j):
            length = j - i
            min_changes = float('inf')
            
            for d in divisors[length]:
                changes = 0
                group_len = length // d
                # Check each of the d interleaved groups
                for offset in range(d):
                    left = i + offset
                    right = i + offset + (group_len - 1) * d
                    while left < right:
                        if s[left] != s[right]:
                            changes += 1
                        left += d
                        right -= d
                if changes < min_changes:
                    min_changes = changes
                    
            return min_changes

        # cost[i][j] = min changes to make s[i:j] a semi-palindrome
        cost = [[float('inf')] * (n + 1) for _ in range(n + 1)]
        for i in range(n):
            for j in range(i + 2, n + 1):
                cost[i][j] = get_cost(i, j)
                
        # dp[p][j] = min changes to partition s[:j] into p semi-palindromes
        dp = [[float('inf')] * (n + 1) for _ in range(k + 1)]
        dp[0][0] = 0
        
        for p in range(1, k + 1):
            # Each semi-palindrome has length >= 2, so j >= 2 * p
            for j in range(2 * p, n + 1):
                for i in range(2 * (p - 1), j - 1):
                    if dp[p - 1][i] != float('inf'):
                        dp[p][j] = min(dp[p][j], dp[p - 1][i] + cost[i][j])
                        
        return dp[k][n]