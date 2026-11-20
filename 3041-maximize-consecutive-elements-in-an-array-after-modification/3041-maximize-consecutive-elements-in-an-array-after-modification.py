class Solution(object):
    def maxSelectedElements(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        nums.sort()
        # dp[v] stores the max length of a consecutive sequence ending at value v
        dp = {}
        max_len = 0
        
        for x in nums:
            # Update x + 1 first so we don't reuse the current element x
            dp[x + 1] = dp.get(x, 0) + 1
            dp[x] = dp.get(x - 1, 0) + 1
            
            max_len = max(max_len, dp[x], dp[x + 1])
            
        return max_len