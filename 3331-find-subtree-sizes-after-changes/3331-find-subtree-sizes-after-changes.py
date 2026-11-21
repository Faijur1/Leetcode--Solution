class Solution(object):
    def findSubtreeSizes(self, parent, s):
        """
        :type parent: List[int]
        :type s: str
        :rtype: List[int]
        """
        n = len(parent)
        
        # Build adjacency list for the original tree
        adj = [[] for _ in range(n)]
        for i in range(1, n):
            adj[parent[i]].append(i)
            
        new_parent = list(parent)
        # Tracks the closest ancestor for each character 'a'-'z'
        last_seen = [-1] * 26
        
        # 1. First DFS: Find the new parent for every node
        def dfs_find_parents(u):
            char_idx = ord(s[u]) - ord('a')
            prev_ancestor = last_seen[char_idx]
            
            # If an ancestor with the same character exists, update new_parent
            if prev_ancestor != -1:
                new_parent[u] = prev_ancestor
                
            # Set current node as the closest ancestor for s[u]
            last_seen[char_idx] = u
            
            for v in adj[u]:
                dfs_find_parents(v)
                
            # Backtrack: restore the previous ancestor state
            last_seen[char_idx] = prev_ancestor

        dfs_find_parents(0)
        
        # Build adjacency list for the updated tree
        new_adj = [[] for _ in range(n)]
        for i in range(1, n):
            new_adj[new_parent[i]].append(i)
            
        ans = [1] * n
        
        # 2. Second DFS: Compute subtree sizes in the final tree
        def dfs_sizes(u):
            for v in new_adj[u]:
                dfs_sizes(v)
                ans[u] += ans[v]
                
        dfs_sizes(0)
        return ans