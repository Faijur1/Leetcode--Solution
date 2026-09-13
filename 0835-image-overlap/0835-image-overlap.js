/**
 * @param {number[][]} img1
 * @param {number[][]} img2
 * @return {number}
 */
var largestOverlap = function(img1, img2) {
    let n = img1.length;
    let onesImg1 = [];
    let onesImg2 = [];

    // Extract coordinates of all 1s in both images
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (img1[r][c] === 1) onesImg1.push([r, c]);
            if (img2[r][c] === 1) onesImg2.push([r, c]);
        }
    }

    let translationCounts = new Map();
    let maxOverlap = 0;

    // Compare every 1 in img1 with every 1 in img2
    for (let i = 0; i < onesImg1.length; i++) {
        for (let j = 0; j < onesImg2.length; j++) {
            let r1 = onesImg1[i][0], c1 = onesImg1[i][1];
            let r2 = onesImg2[j][0], c2 = onesImg2[j][1];
            
            // Create a string key for the vector (JS Maps need string/primitive keys for exact matching)
            let vec = `${r2 - r1},${c2 - c1}`;
            
            // Increment the count for this specific translation
            let count = (translationCounts.get(vec) || 0) + 1;
            translationCounts.set(vec, count);
            
            // Update the maximum overlap found so far
            if (count > maxOverlap) {
                maxOverlap = count;
            }
        }
    }

    return maxOverlap;
};