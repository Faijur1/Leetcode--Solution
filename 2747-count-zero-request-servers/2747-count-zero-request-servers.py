from collections import defaultdict

class Solution(object):
    def countServers(self, n, logs, x, queries):
        """
        :type n: int
        :type logs: List[List[int]]
        :type x: int
        :type queries: List[int]
        :rtype: List[int]
        """
        # Sort logs by timestamp
        logs.sort(key=lambda item: item[1])
        
        # Sort queries while preserving their original indices
        sorted_queries = sorted(enumerate(queries), key=lambda item: item[1])
        
        ans = [0] * len(queries)
        server_count = defaultdict(int)
        active_servers = 0
        
        left = 0
        right = 0
        m = len(logs)
        
        for orig_idx, q_time in sorted_queries:
            window_start = q_time - x
            window_end = q_time
            
            # Expand right boundary: add logs with time <= window_end
            while right < m and logs[right][1] <= window_end:
                s_id = logs[right][0]
                if server_count[s_id] == 0:
                    active_servers += 1
                server_count[s_id] += 1
                right += 1
                
            # Shrink left boundary: remove logs with time < window_start
            while left < m and logs[left][1] < window_start:
                s_id = logs[left][0]
                server_count[s_id] -= 1
                if server_count[s_id] == 0:
                    active_servers -= 1
                left += 1
                
            # Servers that received 0 requests
            ans[orig_idx] = n - active_servers
            
        return ans