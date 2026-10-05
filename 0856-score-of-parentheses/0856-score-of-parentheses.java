class Solution {
    public int scoreOfParentheses(String s) {
        int score = 0;
        int depth = 0;
        
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                depth++;
            } else {
                depth--;
                // If we find an innermost "()", calculate its contribution
                if (i > 0 && s.charAt(i - 1) == '(') {
                    score += 1 << depth; // Equivalent to Math.pow(2, depth)
                }
            }
        }
        
        return score;
    }
}