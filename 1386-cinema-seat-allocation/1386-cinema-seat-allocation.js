/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
    // Start by assuming every row can hold the maximum of 2 families
    let maxFamilies = n * 2;
    const rowMap = new Map();
    
    // Group reserved seats by row using bitwise operations
    for (const [row, seat] of reservedSeats) {
        // We only care about seats 2 through 9. Seats 1 and 10 don't affect 4-person groups.
        if (seat >= 2 && seat <= 9) {
            rowMap.set(row, (rowMap.get(row) || 0) | (1 << seat));
        }
    }
    
    const leftMask = 60;   // Block: 2, 3, 4, 5
    const rightMask = 960; // Block: 6, 7, 8, 9
    const middleMask = 240;// Block: 4, 5, 6, 7
    
    // Evaluate only the rows that have relevant reserved seats
    for (const mask of rowMap.values()) {
        // Subtract the 2 families we initially assumed for this row
        maxFamilies -= 2; 
        
        let leftFree = (mask & leftMask) === 0;
        let rightFree = (mask & rightMask) === 0;
        let middleFree = (mask & middleMask) === 0;
        
        if (leftFree && rightFree) {
            // Both sides are free, we can seat 2 families
            maxFamilies += 2;
        } else if (leftFree || rightFree || middleFree) {
            // Only one 4-seat block is available
            maxFamilies += 1;
        }
    }
    
    return maxFamilies;
};