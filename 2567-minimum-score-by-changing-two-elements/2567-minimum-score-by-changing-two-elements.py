class Solution(object):
    def minimizeSum(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        nums.sort()
        
        # Three ways to reduce the range by neutralizing 2 boundary elements:
        # 1. Remove/change the 2 smallest elements
        # 2. Remove/change the 2 largest elements
        # 3. Remove/change 1 smallest and 1 largest element
        return min(
            nums[-1] - nums[2],
            nums[-3] - nums[0],
            nums[-2] - nums[1]
        )