class Solution {
    public int minInsertions(String s) {
        int insertions = 0;
        int neededRight = 0; // Count of ')' needed to balance

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (c == '(') {
                // If neededRight is odd, the previous '(' only got one ')'
                if (neededRight % 2 != 0) {
                    insertions++;   // Insert one ')' to complete the pair
                    neededRight--;  // One less ')' needed now
                }
                neededRight += 2;   // Each '(' requires two ')'
            } else { // c == ')'
                neededRight--;

                // More ')' than '(' available
                if (neededRight < 0) {
                    insertions++;   // Insert one '('
                    neededRight = 1; // That '(' needs two ')', and we have one here
                }
            }
        }

        return insertions + neededRight;
    }
}