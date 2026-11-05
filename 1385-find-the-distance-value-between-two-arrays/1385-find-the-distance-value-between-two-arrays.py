import bisect

class Solution(object):
    def findTheDistanceValue(self, arr1, arr2, d):
        """
        :type arr1: List[int]
        :type arr2: List[int]
        :type d: int
        :rtype: int
        """
        arr2.sort()
        count = 0
        
        for x in arr1:
            # Find the insertion index for (x - d) in sorted arr2
            idx = bisect.bisect_left(arr2, x - d)
            
            # If idx is within bounds and arr2[idx] <= x + d, then |x - arr2[idx]| <= d
            if idx < len(arr2) and arr2[idx] <= x + d:
                continue
            
            count += 1
            
        return count