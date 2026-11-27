from collections import Counter

class Solution(object):
    def maximumSaleItems(self, items, budget):
        """
        :type items: List[List[int]]
        :type budget: int
        :rtype: int
        """
        max_f = max(f for f, _ in items)
        freq = Counter(f for f, _ in items)
        min_price = min(p for _, p in items)
        
        # 1. Precompute free bonus copies for each distinct factor value
        bonus = {}
        for f in freq:
            total_multiples = 0
            for mult in range(f, max_f + 1, f):
                total_multiples += freq[mult]
            bonus[f] = total_multiples - 1  # Exclude the item itself (j != i)
            
        # 2. Group items by (price, bonus) -> we only ever need at most floor(budget / price)
        #    distinct items of the exact same price and bonus!
        groups = {}
        for f, p in items:
            b = bonus[f]
            groups.setdefault((p, b), 0)
            if groups[(p, b)] < budget // p:
                groups[(p, b)] += 1
                
        # 3. 0/1 Knapsack for the FIRST copy of each distinct item type (gives 1 + bonus[i] copies)
        dp = [0] * (budget + 1)
        for (p, b), count in groups.items():
            val = 1 + b
            for _ in range(count):
                for c in range(budget, p - 1, -1):
                    if dp[c - p] + val > dp[c]:
                        dp[c] = dp[c - p] + val
                        
        # 4. Remaining budget after buying initial distinct items is always best spent
        #    on the single cheapest item overall (each extra copy gives +1 item).
        ans = 0
        for c in range(budget + 1):
            extra_copies = (budget - c) // min_price
            if dp[c] + extra_copies > ans:
                ans = dp[c] + extra_copies
                
        return ans