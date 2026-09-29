/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const pathLength = m + n - 1;
    
    // A valid parentheses string must have an even length.
    if (pathLength % 2 !== 0) return false;
    
    // The string cannot start with a closing bracket or end with an opening bracket.
    if (grid[0][0] === ')' || grid[m - 1][n - 1] === '(') return false;
    
    const maxBalance = Math.floor(pathLength / 2);
    
    // visited[r][c][balance] tracks if we have already visited cell (r, c) with a specific balance.
    // Uint8Array is used for memory efficiency since we only need 0 or 1.
    const visited = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => new Uint8Array(maxBalance + 1))
    );
    
    function dfs(r, c, balance) {
        // Update the current balance based on the current cell
        balance += grid[r][c] === '(' ? 1 : -1;
        
        // If balance drops below 0, there are more ')' than '(', which is invalid.
        // If balance exceeds maxBalance, it's impossible to close all open brackets by the end.
        if (balance < 0 || balance > maxBalance) return false;
        
        // If we reach the bottom-right corner, check if the balance is exactly 0.
        if (r === m - 1 && c === n - 1) {
            return balance === 0;
        }
        
        // If we've already evaluated this state and it didn't lead to a valid path, prune it.
        if (visited[r][c][balance]) return false;
        visited[r][c][balance] = 1;
        
        // Move Down or Right
        if (r + 1 < m && dfs(r + 1, c, balance)) return true;
        if (c + 1 < n && dfs(r, c + 1, balance)) return true;
        
        return false;
    }
    
    return dfs(0, 0, 0);
};