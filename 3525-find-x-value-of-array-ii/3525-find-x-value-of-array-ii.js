/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var resultArray = function(nums, k, queries) {
    const n = nums.length;
    // Flat Int32Arrays for extreme cache efficiency and speed
    const tree_p = new Int32Array(4 * n + 5);
    const tree_c = new Int32Array((4 * n + 5) * k);

    function build(node, l, r) {
        if (l === r) {
            const v = nums[l] % k;
            tree_p[node] = v;
            tree_c[node * k + v] = 1;
            return;
        }
        const mid = (l + r) >> 1;
        const left = node * 2;
        const right = node * 2 + 1;
        
        build(left, l, mid);
        build(right, mid + 1, r);
        merge(node, left, right);
    }

    function merge(node, left, right) {
        const lp = tree_p[left];
        const rp = tree_p[right];
        tree_p[node] = (lp * rp) % k;
        
        const nodeIdx = node * k;
        const leftIdx = left * k;
        const rightIdx = right * k;
        
        // Inherit prefixes ending purely in the left child
        for (let i = 0; i < k; i++) {
            tree_c[nodeIdx + i] = tree_c[leftIdx + i];
        }
        
        // Include prefixes stretching into the right child
        for (let i = 0; i < k; i++) {
            if (tree_c[rightIdx + i] > 0) {
                const shiftedIdx = (lp * i) % k;
                tree_c[nodeIdx + shiftedIdx] += tree_c[rightIdx + i];
            }
        }
    }

    function update(node, l, r, idx, val) {
        if (l === r) {
            const v = val % k;
            tree_p[node] = v;
            const nodeIdx = node * k;
            for (let i = 0; i < k; i++) {
                tree_c[nodeIdx + i] = 0;
            }
            tree_c[nodeIdx + v] = 1;
            return;
        }
        const mid = (l + r) >> 1;
        const left = node * 2;
        const right = node * 2 + 1;
        
        if (idx <= mid) {
            update(left, l, mid, idx, val);
        } else {
            update(right, mid + 1, r, idx, val);
        }
        merge(node, left, right);
    }

    build(1, 0, n - 1);

    const res = [];
    let curr_prod = 1;
    let total_target = 0;

    function traverse(node, l, r, ql, qr, target) {
        if (ql <= l && r <= qr) {
            const nodeIdx = node * k;
            for (let v = 0; v < k; v++) {
                if ((curr_prod * v) % k === target) {
                    total_target += tree_c[nodeIdx + v];
                }
            }
            curr_prod = (curr_prod * tree_p[node]) % k;
            return;
        }
        
        const mid = (l + r) >> 1;
        if (ql <= mid) traverse(node * 2, l, mid, ql, qr, target);
        if (qr > mid) traverse(node * 2 + 1, mid + 1, r, ql, qr, target);
    }

    for (let i = 0; i < queries.length; i++) {
        const index = queries[i][0];
        const value = queries[i][1];
        const start = queries[i][2];
        const x = queries[i][3];

        // 1. Point Update limits/persists for consecutive queries 
        update(1, 0, n - 1, index, value);
        
        // 2. Query prefix ranges matching the target condition modulo
        curr_prod = 1;
        total_target = 0;
        traverse(1, 0, n - 1, start, n - 1, x);
        
        res.push(total_target);
    }

    return res;
};