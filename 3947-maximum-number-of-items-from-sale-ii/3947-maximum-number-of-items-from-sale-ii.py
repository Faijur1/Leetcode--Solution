from collections import Counter

class Solution(object):
    def maximumSaleItems(self, items, budget):
        """
        :type items: List[List[int]]
        :type budget: int
        :rtype: int
        """
        n = len(items)
        freq = Counter(f for f, _ in items)
        
        max_bonuses = {}
        for f in freq:
            total_multiples = 0
            for mult in range(f, n + 1, f):
                total_multiples += freq[mult]
            max_bonuses[f] = total_multiples - 1
            
        items_sorted = sorted(items, key=lambda x: x[1])
        min_price = items_sorted[0][1]
        
        total_items = 0
        remaining_budget = budget
        
        for f, p in items_sorted:
            if p >= 2 * min_price or remaining_budget < p:
                break
            cap = max_bonuses[f]
            if cap > 0:
                buy = min(cap, remaining_budget // p)
                total_items += buy * 2
                remaining_budget -= buy * p
                
        total_items += remaining_budget // min_price
        return total_items