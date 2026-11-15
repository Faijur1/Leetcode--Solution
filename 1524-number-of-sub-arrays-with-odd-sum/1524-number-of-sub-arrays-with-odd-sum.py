class Solution(object):
    def numOfSubarrays(self, arr):
        """
        :type arr: List[int]
        :rtype: int
        """
        MOD = 10**9 + 7
        
        # An empty prefix sum is 0, which is even, so even_count starts at 1
        even_count = 1
        odd_count = 0
        
        prefix_sum = 0
        result = 0
        
        for num in arr:
            prefix_sum += num
            
            if prefix_sum % 2 == 1:
                # Current prefix sum is odd; pair with previous even prefix sums
                result = (result + even_count) % MOD
                odd_count += 1
            else:
                # Current prefix sum is even; pair with previous odd prefix sums
                result = (result + odd_count) % MOD
                even_count += 1
                
        return result