/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function(head) {
    // If there are fewer than 3 nodes, there can be no critical points
    if (!head || !head.next || !head.next.next) {
        return [-1, -1];
    }

    let prev = head;
    let curr = head.next;
    let currentIndex = 1; 

    let firstCriticalIndex = -1;
    let prevCriticalIndex = -1;

    let minDistance = Infinity;

    // Traverse until the second-to-last node
    while (curr.next !== null) {
        let next = curr.next;

        // Check if the current node is a local maxima or minima
        if ((curr.val > prev.val && curr.val > next.val) || 
            (curr.val < prev.val && curr.val < next.val)) {
            
            // If it's the first critical point we've found
            if (firstCriticalIndex === -1) {
                firstCriticalIndex = currentIndex;
            } else {
                // For second and subsequent critical points, update the min distance
                minDistance = Math.min(minDistance, currentIndex - prevCriticalIndex);
            }
            
            // Update the previous critical point index to the current one
            prevCriticalIndex = currentIndex;
        }

        // Move the pointers forward
        prev = curr;
        curr = next;
        currentIndex++;
    }

    // If we found fewer than 2 critical points, minDistance will still be Infinity
    if (minDistance === Infinity) {
        return [-1, -1];
    }

    // The max distance is always the distance between the first and last critical points
    let maxDistance = prevCriticalIndex - firstCriticalIndex;

    return [minDistance, maxDistance];
};