class Solution(object):
    def minCost(self, grid):
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        m = len(grid)
        n = len(grid[0])
        
        # dp[j] holds a set of all reachable XOR values at column j
        dp = [set() for _ in range(n)]
        
        # Base case
        dp[0].add(grid[0][0])
        
        # Initialize first row (can only come from the left)
        for j in range(1, n):
            val = grid[0][j]
            dp[j] = {v ^ val for v in dp[j - 1]}
            
        # Process remaining rows
        for i in range(1, m):
            # First cell of the row (can only come from above)
            new_dp = [set() for _ in range(n)]
            val = grid[i][0]
            new_dp[0] = {v ^ val for v in dp[0]}
            
            for j in range(1, n):
                val = grid[i][j]
                # Can come from either above (dp[j]) or left (new_dp[j - 1])
                combined_prev = dp[j] | new_dp[j - 1]
                new_dp[j] = {v ^ val for v in combined_prev}
                
            dp = new_dp
            
        return min(dp[n - 1])