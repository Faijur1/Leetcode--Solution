import heapq

class Solution(object):
    def shortestPath(self, n, edges, labels, k):
        """
        :type n: int
        :type edges: List[List[int]]
        :type labels: str
        :type k: int
        :rtype: int
        """
        if n == 1:
            return 0
        
        # Build adjacency list
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            
        # dist[u][consec] stores the minimum cost to reach node u
        # with 'consec' consecutive occurrences of labels[u]
        # consec ranges from 1 to k
        dist = [{} for _ in range(n)]
        
        # Min-heap priority queue storing: (cost, u, consec)
        # Starting at node 0 with 1 instance of labels[0]
        pq = [(0, 0, 1)]
        dist[0][1] = 0
        
        while pq:
            d, u, consec = heapq.heappop(pq)
            
            # Destination reached with minimum weight
            if u == n - 1:
                return d
            
            if d > dist[u].get(consec, float('inf')):
                continue
                
            for v, w in adj[u]:
                if labels[v] == labels[u]:
                    next_consec = consec + 1
                    if next_consec > k:
                        continue
                else:
                    next_consec = 1
                
                new_d = d + w
                if new_d < dist[v].get(next_consec, float('inf')):
                    dist[v][next_consec] = new_d
                    heapq.heappush(pq, (new_d, v, next_consec))
                    
        return -1