/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var averageOfSubtree = function(root) {
    let resultCount = 0;

    // Helper function that returns [sum_of_subtree, count_of_nodes]
    function dfs(node) {
        // Base case: if the node is null, sum is 0 and count is 0
        if (node === null) {
            return [0, 0];
        }

        // Recursively traverse the left and right subtrees
        const [leftSum, leftCount] = dfs(node.left);
        const [rightSum, rightCount] = dfs(node.right);

        // Calculate the sum and count for the current subtree
        const currentSum = node.val + leftSum + rightSum;
        const currentCount = 1 + leftCount + rightCount;

        // Calculate the average (rounded down) and check against the node's value
        const currentAvg = Math.floor(currentSum / currentCount);
        
        if (node.val === currentAvg) {
            resultCount++;
        }

        // Return the current sum and count to the parent node
        return [currentSum, currentCount];
    }

    // Start the traversal from the root
    dfs(root);
    
    return resultCount;
};