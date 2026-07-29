import math
from collections import Counter

class Solution(object):
    def smallestPalindrome(self, s, k):
        """
        :type s: str
        :type k: int
        :rtype: str
        """
        freq = Counter(s)
        half_counts = {}
        mid_char = ""
        
        for char, count in freq.items():
            if count % 2 != 0:
                mid_char = char
            if count // 2 > 0:
                half_counts[char] = count // 2
                
        N = sum(half_counts.values())
        
        # Calculate total distinct permutations of the half-string
        total = math.factorial(N)
        for count in half_counts.values():
            total //= math.factorial(count)
            
        # If k exceeds the number of possible permutations, return empty string
        if k > total:
            return ""
            
        half_res = []
        chars = sorted(half_counts.keys())
        
        # Build the k-th lexicographically smallest half-string
        for _ in range(N):
            for char in chars:
                if half_counts[char] > 0:
                    # Calculate permutations for the remaining positions if 'char' is chosen
                    ways = total * half_counts[char] // N
                    
                    if k <= ways:
                        half_res.append(char)
                        half_counts[char] -= 1
                        total = ways
                        N -= 1
                        break
                    else:
                        k -= ways
                        
        first_half = "".join(half_res)
        
        # Construct the final palindrome
        return first_half + mid_char + first_half[::-1]