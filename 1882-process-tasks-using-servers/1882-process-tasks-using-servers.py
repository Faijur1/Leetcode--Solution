import heapq

class Solution(object):
    def assignTasks(self, servers, tasks):
        """
        :type servers: List[int]
        :type tasks: List[int]
        :rtype: List[int]
        """
        # available: (weight, index)
        available = [(weight, i) for i, weight in enumerate(servers)]
        heapq.heapify(available)
        
        # busy: (free_time, weight, index)
        busy = []
        
        ans = []
        current_time = 0
        
        for j, task_time in enumerate(tasks):
            # The j-th task becomes available at least at second j
            current_time = max(current_time, j)
            
            # If no servers are available, fast-forward time to when the earliest server becomes free
            if not available:
                current_time = busy[0][0]
                
            # Free up all servers that have completed their tasks by current_time
            while busy and busy[0][0] <= current_time:
                free_time, weight, idx = heapq.heappop(busy)
                heapq.heappush(available, (weight, idx))
                
            # Assign the task to the highest-priority available server
            weight, idx = heapq.heappop(available)
            ans.append(idx)
            heapq.heappush(busy, (current_time + task_time, weight, idx))
            
        return ans