class Solution(object):
    def climbStairs(self, n, costs):
        """
        :type n: int
        :type costs: List[int]
        :rtype: int
        """
        # dp0, dp1, dp2 correspond to dp[i-3], dp[i-2], dp[i-1]
        # At start (step 0): dp[0] = 0. Steps < 0 are unreachable (infinity).
        dp0 = float('inf')  # dp[i-3]
        dp1 = float('inf')  # dp[i-2]
        dp2 = 0             # dp[i-1] -> represents step 0 initially
        
        for i in range(1, n + 1):
            cost_i = costs[i - 1]  # 0-indexed costs array
            
            curr = cost_i + min(
                dp2 + 1,  # from step i - 1
                dp1 + 4,  # from step i - 2
                dp0 + 9   # from step i - 3
            )
            
            # Shift window for the next step
            dp0, dp1, dp2 = dp1, dp2, curr
            
        return dp2