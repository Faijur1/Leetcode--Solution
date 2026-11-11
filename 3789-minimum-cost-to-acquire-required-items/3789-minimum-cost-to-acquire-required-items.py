class Solution(object):
    def minimumCost(self, cost1, cost2, costBoth, need1, need2):
        """
        :type cost1: int
        :type cost2: int
        :type costBoth: int
        :type need1: int
        :type need2: int
        :rtype: int
        """
        # Option 1: Buy only individual items
        cost_no_both = need1 * cost1 + need2 * cost2
        
        # Option 2: Buy type 3 items to cover the shared minimum requirement
        shared = min(need1, need2)
        rem1 = need1 - shared
        rem2 = need2 - shared
        cost_min_both = (
            shared * costBoth
            + rem1 * min(cost1, costBoth)
            + rem2 * min(cost2, costBoth)
        )
        
        # Option 3: Buy type 3 items to cover the entire maximum requirement
        cost_all_both = max(need1, need2) * costBoth
        
        return min(cost_no_both, cost_min_both, cost_all_both)