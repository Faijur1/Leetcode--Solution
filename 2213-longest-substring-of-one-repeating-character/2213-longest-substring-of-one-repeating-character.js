/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
var longestRepeating = function(s, queryCharacters, queryIndices) {
    const n = s.length;
    // Segment Tree arrays. 4 * N is the standard safe size bound.
    const maxLen = new Int32Array(4 * n + 4);
    const prefLen = new Int32Array(4 * n + 4);
    const suffLen = new Int32Array(4 * n + 4);
    const prefChar = new Uint8Array(4 * n + 4);
    const suffChar = new Uint8Array(4 * n + 4);
    const segLen = new Int32Array(4 * n + 4);
    
    // Combines left and right children data into the parent node
    function merge(node) {
        let left = node * 2;
        let right = node * 2 + 1;
        
        prefChar[node] = prefChar[left];
        suffChar[node] = suffChar[right];
        
        // Calculate prefix length for the current node
        if (prefLen[left] === segLen[left] && prefChar[left] === prefChar[right]) {
            prefLen[node] = segLen[left] + prefLen[right];
        } else {
            prefLen[node] = prefLen[left];
        }
        
        // Calculate suffix length for the current node
        if (suffLen[right] === segLen[right] && suffChar[right] === suffChar[left]) {
            suffLen[node] = segLen[right] + suffLen[left];
        } else {
            suffLen[node] = suffLen[right];
        }
        
        // The max length is at least the max of left and right child's max lengths
        maxLen[node] = maxLen[left] > maxLen[right] ? maxLen[left] : maxLen[right];
        
        // If the left child's suffix and right child's prefix merge together
        if (suffChar[left] === prefChar[right]) {
            let combinedLen = suffLen[left] + prefLen[right];
            if (combinedLen > maxLen[node]) {
                maxLen[node] = combinedLen;
            }
        }
    }
    
    // Builds the segment tree from the initial string
    function build(node, l, r) {
        segLen[node] = r - l + 1;
        if (l === r) {
            let c = s.charCodeAt(l);
            maxLen[node] = 1;
            prefLen[node] = 1;
            suffLen[node] = 1;
            prefChar[node] = c;
            suffChar[node] = c;
            return;
        }
        let mid = (l + r) >> 1;
        build(node * 2, l, mid);
        build(node * 2 + 1, mid + 1, r);
        merge(node);
    }
    
    // Updates a character at a specific index in the segment tree
    function update(node, l, r, idx, c) {
        if (l === r) {
            prefChar[node] = c;
            suffChar[node] = c;
            return;
        }
        let mid = (l + r) >> 1;
        if (idx <= mid) {
            update(node * 2, l, mid, idx, c);
        } else {
            update(node * 2 + 1, mid + 1, r, idx, c);
        }
        merge(node);
    }
    
    // Main Initialization
    build(1, 0, n - 1);
    
    const k = queryCharacters.length;
    const ans = new Array(k);
    
    // Process queries
    for (let i = 0; i < k; i++) {
        update(1, 0, n - 1, queryIndices[i], queryCharacters.charCodeAt(i));
        ans[i] = maxLen[1]; // maxLen of the root node holds the answer for the entire string
    }
    
    return ans;
};