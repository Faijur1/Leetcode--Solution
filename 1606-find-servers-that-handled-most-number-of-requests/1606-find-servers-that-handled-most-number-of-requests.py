import heapq
from sortedcontainers import SortedList

class Solution(object):
    def busiestServers(self, k, arrival, load):
        """
        :type k: int
        :type arrival: List[int]
        :type load: List[int]
        :rtype: List[int]
        """
        # Tracks the number of requests each server handled
        count = [0] * k
        
        # Available servers maintained in a SortedList for O(log k) successor lookup
        available = SortedList(range(k))
        
        # Min-heap storing (release_time, server_id)
        busy = []
        
        for i, (start, duration) in enumerate(zip(arrival, load)):
            # Free up servers that finished before or at current arrival time
            while busy and busy[0][0] <= start:
                _, server_id = heapq.heappop(busy)
                available.add(server_id)
            
            # If no servers are available, drop the request
            if not available:
                continue
            
            # Find the first available server >= (i % k)
            target = i % k
            idx = available.bisect_left(target)
            
            # Wrap around to the start if no server >= target is free
            if idx == len(available):
                idx = 0
            
            server_id = available[idx]
            available.remove(server_id)
            
            # Mark the server busy until start + duration
            heapq.heappush(busy, (start + duration, server_id))
            count[server_id] += 1
            
        max_handled = max(count)
        return [s for s in range(k) if count[s] == max_handled]