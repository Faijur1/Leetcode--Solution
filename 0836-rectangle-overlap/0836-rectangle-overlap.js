/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
var isRectangleOverlap = function(rec1, rec2) {
    // A rectangle overlaps if its 1D projections overlap on both the X and Y axes.
    // X-axis: rec1's left edge must be before rec2's right edge, AND rec1's right edge after rec2's left edge.
    // Y-axis: rec1's bottom edge must be before rec2's top edge, AND rec1's top edge after rec2's bottom edge.
    
    return rec1[0] < rec2[2] && rec1[2] > rec2[0] &&
           rec1[1] < rec2[3] && rec1[3] > rec2[1];
};