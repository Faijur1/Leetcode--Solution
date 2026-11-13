from collections import deque

class Solution(object):
    def countNonDecreasingSubarrays(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: int
        """
        n = len(nums)
        dq = deque()  # Monotonic decreasing deque of indices
        cost = 0
        ans = 0
        r = n - 1

        for l in range(n - 1, -1, -1):
            # Merge blocks dominated by nums[l]
            while dq and nums[dq[0]] <= nums[l]:
                idx = dq.popleft()
                next_idx = dq[0] if dq else r + 1
                cost += (next_idx - idx) * (nums[l] - nums[idx])
            
            dq.appendleft(l)

            # Shrink window from the right until cost <= k
            while cost > k:
                cost -= nums[dq[-1]] - nums[r]
                if dq[-1] == r:
                    dq.pop()
                r -= 1

            ans += r - l + 1

        return ans