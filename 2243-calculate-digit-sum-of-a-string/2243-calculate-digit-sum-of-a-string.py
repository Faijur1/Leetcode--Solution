class Solution(object):
    def digitSum(self, s, k):
        """
        :type s: str
        :type k: int
        :rtype: str
        """
        while len(s) > k:
            next_s = []
            # Iterate through s in steps of k
            for i in range(0, len(s), k):
                group = s[i:i + k]
                # Sum the digits in the current group
                group_sum = sum(int(digit) for digit in group)
                next_s.append(str(group_sum))
            
            # Merge the converted sums into the new string
            s = "".join(next_s)
            
        return s