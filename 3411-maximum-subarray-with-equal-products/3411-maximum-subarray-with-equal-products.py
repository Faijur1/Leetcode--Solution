class Solution(object):
    def maxLength(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        def gcd(a, b):
            while b:
                a, b = b, a % b
            return a

        def lcm(a, b):
            return (a * b) // gcd(a, b)

        n = len(nums)
        max_len = 1
        # Max possible LCM for numbers 1..10 is 2520; max possible GCD is 10.
        max_possible_val = 2520 * 10

        for i in range(n):
            curr_prod = 1
            curr_gcd = 0
            curr_lcm = 1

            for j in range(i, n):
                curr_prod *= nums[j]
                if curr_prod > max_possible_val:
                    break

                curr_gcd = gcd(curr_gcd, nums[j])
                curr_lcm = lcm(curr_lcm, nums[j])

                if curr_prod == curr_lcm * curr_gcd:
                    max_len = max(max_len, j - i + 1)

        return max_len