class Solution(object):
    def minimumSumSubarray(self, nums, l, r):
        """
        :type nums: List[int]
        :type l: int
        :type r: int
        :rtype: int
        """
        n = len(nums)
        min_sum = float('inf')
        
        for i in range(n):
            current_sum = 0
            # End index j goes up to i + r - 1 (inclusive), bounded by n - 1
            for j in range(i, min(n, i + r)):
                current_sum += nums[j]
                length = j - i + 1
                
                if length >= l and current_sum > 0:
                    if current_sum < min_sum:
                        min_sum = current_sum
                        
        return min_sum if min_sum != float('inf') else -1