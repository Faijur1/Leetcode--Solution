/**
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function(classroom, energy) {
    const m = classroom.length;
    const n = classroom[0].length;
    
    let startR = -1, startC = -1;
    let K = 0; // Number of 'L's
    
    // Grid mapping to numbers for fast access:
    // 0: empty / 'S'
    // 1: 'X'
    // 2: 'R'
    // 3+: 'L' (Litter index = value - 3)
    const grid = new Int32Array(m * n);
    
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const char = classroom[r][c];
            const idx = r * n + c;
            if (char === 'S') {
                startR = r;
                startC = c;
                grid[idx] = 0;
            } else if (char === 'X') {
                grid[idx] = 1;
            } else if (char === 'R') {
                grid[idx] = 2;
            } else if (char === 'L') {
                grid[idx] = 3 + K;
                K++;
            } else {
                grid[idx] = 0; // '.'
            }
        }
    }
    
    if (K === 0) return 0;
    
    const targetMask = (1 << K) - 1;
    
    // state mapping: (r * 20 + c) * 1024 + mask
    // Max states: 400 * 1024 = 409600
    const maxEnergyVisited = new Int8Array(409600);
    maxEnergyVisited.fill(-1);
    
    // Queues for BFS (5,000,000 capacity per layer is safely bounding worst-case widths)
    let currQ = new Int32Array(5000000);
    let nextQ = new Int32Array(5000000);
    let currSize = 0;
    let nextSize = 0;
    
    const startStateIdx = (startR * n + startC) * 1024 + 0;
    maxEnergyVisited[startStateIdx] = energy;
    
    // Pack state: (r << 21) | (c << 16) | (mask << 6) | e
    currQ[currSize++] = (startR << 21) | (startC << 16) | (0 << 6) | energy;
    
    let dist = 0;
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    
    while (currSize > 0) {
        for (let i = 0; i < currSize; i++) {
            const val = currQ[i];
            const r = val >>> 21;
            const c = (val >> 16) & 31;
            const mask = (val >> 6) & 1023;
            const e = val & 63;
            
            if (e === 0) continue; // Cannot move anywhere if energy is 0
            
            for (let d = 0; d < 4; d++) {
                const nr = r + dr[d];
                const nc = c + dc[d];
                
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                
                const type = grid[nr * n + nc];
                if (type === 1) continue; // Skip 'X' Obstacles
                
                let nMask = mask;
                let nE = e - 1;
                
                if (type === 2) {
                    nE = energy; // Recharge 'R'
                } else if (type >= 3) {
                    nMask |= (1 << (type - 3)); // Pick up litter 'L'
                    if (nMask === targetMask) {
                        return dist + 1; // All pieces gathered
                    }
                }
                
                const stateIdx = (nr * n + nc) * 1024 + nMask;
                if (nE > maxEnergyVisited[stateIdx]) {
                    maxEnergyVisited[stateIdx] = nE;
                    nextQ[nextSize++] = (nr << 21) | (nc << 16) | (nMask << 6) | nE;
                }
            }
        }
        
        dist++;
        const temp = currQ;
        currQ = nextQ;
        nextQ = temp;
        currSize = nextSize;
        nextSize = 0;
    }
    
    return -1;
};