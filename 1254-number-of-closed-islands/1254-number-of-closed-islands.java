class Solution {
    public int closedIsland(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;

        // 1. Jo land (0) boundary se judi hai, wo kabhi 'closed island' nahi ho sakti.
        // Isliye boundary se shuru hone wale saare 0s ko 1 (water/visited) bana do.
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
                    if (grid[i][j] == 0) {
                        dfs(grid, i, j);
                    }
                }
            }
        }

        // 2. Ab bache huye 0s pakka fully enclosed (surrounded by 1s) hain.
        // Unhe count karo aur visited mark karne ke liye DFS chalao.
        int closedIslandsCount = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) {
                    closedIslandsCount++;
                    dfs(grid, i, j);
                }
            }
        }

        return closedIslandsCount;
    }

    private void dfs(int[][] grid, int r, int c) {
        // Boundary check ya water check
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == 1) {
            return;
        }

        // Visited mark karne ke liye 0 ko 1 bana do
        grid[r][c] = 1;

        // Chaaro directions (top, bottom, left, right) me explore karo
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}