class Solution(object):
    def createGrid(self, m, n):
        """
        :type m: int
        :type n: int
        :rtype: List[str]
        """
        grid = []
        
        # First row is entirely free cells
        grid.append("." * n)
        
        # Remaining rows only have a free cell at the last column
        for _ in range(m - 1):
            grid.append("#" * (n - 1) + ".")
            
        return grid