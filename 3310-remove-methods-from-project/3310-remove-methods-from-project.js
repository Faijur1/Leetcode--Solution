/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function(n, k, invocations) {
    // 1. Build adjacency list for the directed graph
    const graph = Array.from({ length: n }, () => []);
    for (let i = 0; i < invocations.length; i++) {
        const u = invocations[i][0];
        const v = invocations[i][1];
        graph[u].push(v);
    }

    // 2. Identify all suspicious methods using BFS
    // Using Uint8Array for a fast boolean visited array
    const suspicious = new Uint8Array(n); 
    const queue = [k];
    suspicious[k] = 1;
    
    let head = 0;
    while (head < queue.length) {
        const curr = queue[head++];
        const neighbors = graph[curr];
        
        for (let i = 0; i < neighbors.length; i++) {
            const next = neighbors[i];
            if (suspicious[next] === 0) {
                suspicious[next] = 1;
                queue.push(next);
            }
        }
    }

    // 3. Check if any non-suspicious method invokes a suspicious method
    let canRemove = true;
    for (let i = 0; i < invocations.length; i++) {
        const u = invocations[i][0];
        const v = invocations[i][1];
        
        if (suspicious[u] === 0 && suspicious[v] === 1) {
            canRemove = false;
            break;
        }
    }

    // 4. Construct the final result array
    const result = [];
    if (canRemove) {
        // Only push safe methods
        for (let i = 0; i < n; i++) {
            if (suspicious[i] === 0) {
                result.push(i);
            }
        }
    } else {
        // Cannot remove, return all methods
        for (let i = 0; i < n; i++) {
            result.push(i);
        }
    }
    
    return result;
};