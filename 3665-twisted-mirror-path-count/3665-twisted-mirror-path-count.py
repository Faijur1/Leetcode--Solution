import sys

# Increase recursion depth for large grids
sys.setrecursionlimit(2000000)

class Solution(object):
    def uniquePaths(self, grid):
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        m = len(grid)
        n = len(grid[0])
        MOD = 10**9 + 7
        
        # memo_mirror[(r, c, dir)] = final (r', c') destination non-mirror cell, or None
        # dir: 0 for right, 1 for down
        memo_mirror = {}
        
        def resolve(r, c, direction):
            # Check boundaries
            if r >= m or c >= n:
                return None
            
            # If it's an empty cell, the robot successfully lands here
            if grid[r][c] == 0:
                return (r, c)
            
            state = (r, c, direction)
            if state in memo_mirror:
                return memo_mirror[state]
            
            # grid[r][c] == 1 (Mirror)
            if direction == 0:  # Moving right into this mirror
                # Deflected down: moves to the cell directly below this mirror
                res = resolve(r + 1, c, 1)
            else:  # Moving down into this mirror
                # Deflected right: moves to the cell directly to the right of this mirror
                res = resolve(r, c + 1, 0)
                
            memo_mirror[state] = res
            return res

        # memo_dp[r][c] = number of valid paths from empty cell (r, c) to (m - 1, n - 1)
        memo_dp = {}
        
        def dp(r, c):
            if r == m - 1 and c == n - 1:
                return 1
            
            if (r, c) in memo_dp:
                return memo_dp[(r, c)]
            
            total = 0
            
            # 1. Try moving right
            target_right = resolve(r, c + 1, 0)
            if target_right is not None:
                total = (total + dp(target_right[0], target_right[1])) % MOD
                
            # 2. Try moving down
            target_down = resolve(r + 1, c, 1)
            if target_down is not None:
                total = (total + dp(target_down[0], target_down[1])) % MOD
                
            memo_dp[(r, c)] = total
            return total

        return dp(0, 0)