/**
 * @param {string} s
 * @return {number}
 */
var maximumLengthSubstring = function(s) {
    let left = 0;
    let maxLength = 0;
    const charCount = {};

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        
        // Add the current character to our frequency map
        charCount[rightChar] = (charCount[rightChar] || 0) + 1;

        // If a character appears more than twice, shrink the window from the left
        while (charCount[rightChar] > 2) {
            const leftChar = s[left];
            charCount[leftChar]--;
            left++;
        }

        // Update the maximum length found so far
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};