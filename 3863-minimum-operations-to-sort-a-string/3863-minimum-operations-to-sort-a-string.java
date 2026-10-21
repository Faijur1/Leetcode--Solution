class Solution {
    public int minOperations(String s) {
        int n = s.length();
        
        // Check if s is already sorted
        boolean isSorted = true;
        char minChar = s.charAt(0);
        char maxChar = s.charAt(0);
        
        for (int i = 1; i < n; i++) {
            char c = s.charAt(i);
            if (c < s.charAt(i - 1)) {
                isSorted = false;
            }
            if (c < minChar) {
                minChar = c;
            }
            if (c > maxChar) {
                maxChar = c;
            }
        }
        
        if (isSorted) {
            return 0;
        }
        
        // Cannot sort a 2-character string using proper substrings
        if (n == 2) {
            return -1;
        }
        
        // Can be sorted in 1 operation if the first character is min 
        // or the last character is max
        if (s.charAt(0) == minChar || s.charAt(n - 1) == maxChar) {
            return 1;
        }
        
        // Can be sorted in 2 operations if an instance of minChar or maxChar
        // is in the middle: s[1 ... n-2]
        for (int i = 1; i < n - 1; i++) {
            char c = s.charAt(i);
            if (c == minChar || c == maxChar) {
                return 2;
            }
        }
        
        // Otherwise, minChar is only at the end and maxChar is only at the beginning
        return 3;
    }
}