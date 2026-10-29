class Fenwick:
    def __init__(self, size):
        self.size = size
        self.tree = [0] * (size + 2)

    def _update_point(self, i, val):
        while i <= self.size:
            self.tree[i] ^= val
            i += i & (-i)

    def update_range(self, l, r, val):
        self._update_point(l, val)
        self._update_point(r + 1, val)

    def query(self, i):
        res = 0
        while i > 0:
            res ^= self.tree[i]
            i -= i & (-i)
        return res


class Solution(object):
    def palindromePath(self, n, edges, s, queries):
        """
        :type n: int
        :type edges: List[List[int]]
        :type s: str
        :type queries: List[str]
        :rtype: List[bool]
        """
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        LOG = n.bit_length() + 1
        up = [[0] * LOG for _ in range(n)]
        depth = [0] * n
        tin = [0] * n
        tout = [0] * n
        root_mask = [0] * n

        chars = [ord(c) - ord('a') for c in s]

        # Iterative DFS to build tin, tout, depth, up[u][0], and root_mask
        timer = [1]
        stack = [(0, -1, 0, 0, 0)]  # (u, p, d, cur_mask, state: 0=enter, 1=exit)

        while stack:
            u, p, d, cur_mask, state = stack.pop()
            if state == 0:
                tin[u] = timer[0]
                timer[0] += 1
                depth[u] = d
                up[u][0] = p if p != -1 else 0
                cur_mask ^= (1 << chars[u])
                root_mask[u] = cur_mask
                
                # Push exit frame first
                stack.append((u, p, d, cur_mask, 1))
                
                # Push children
                for v in adj[u]:
                    if v != p:
                        stack.append((v, u, d + 1, cur_mask, 0))
            else:
                tout[u] = timer[0] - 1

        # Binary lifting ancestor precomputations
        for j in range(1, LOG):
            for i in range(n):
                up[i][j] = up[up[i][j - 1]][j - 1]

        def get_lca(u, v):
            if depth[u] < depth[v]:
                u, v = v, u
            diff = depth[u] - depth[v]
            for j in range(LOG):
                if (diff >> j) & 1:
                    u = up[u][j]
            if u == v:
                return u
            for j in range(LOG - 1, -1, -1):
                if up[u][j] != up[v][j]:
                    u = up[u][j]
                    v = up[v][j]
            return up[u][0]

        bit = Fenwick(timer[0] + 2)

        # Initialize BIT with initial path masks
        for i in range(n):
            bit.update_range(tin[i], tin[i], root_mask[i])

        ans = []
        for q in queries:
            parts = q.split()
            if parts[0] == "update":
                u = int(parts[1])
                new_c = ord(parts[2]) - ord('a')
                old_c = chars[u]
                if old_c != new_c:
                    diff_mask = (1 << old_c) ^ (1 << new_c)
                    chars[u] = new_c
                    bit.update_range(tin[u], tout[u], diff_mask)
            else:
                u = int(parts[1])
                v = int(parts[2])
                lca = get_lca(u, v)

                mask_u = bit.query(tin[u])
                mask_v = bit.query(tin[v])

                path_mask = mask_u ^ mask_v ^ (1 << chars[lca])
                ans.append((path_mask & (path_mask - 1)) == 0)

        return ans