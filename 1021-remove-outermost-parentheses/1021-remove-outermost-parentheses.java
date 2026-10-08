class Solution {
    public String removeOuterParentheses(String s) {
        StringBuilder result = new StringBuilder();
        int balance = 0;

        for (char c : s.toCharArray()) {
            if (c == '(') {
                // If balance > 0, this '(' is not the outermost parenthesis of the primitive block
                if (balance > 0) {
                    result.append(c);
                }
                balance++;
            } else {
                balance--;
                // If balance > 0, this ')' is not the closing outermost parenthesis
                if (balance > 0) {
                    result.append(c);
                }
            }
        }

        return result.toString();
    }
}