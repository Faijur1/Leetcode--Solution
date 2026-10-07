import java.util.*;

class Solution {
    public List<String> removeInvalidParentheses(String s) {
        int leftRem = 0, rightRem = 0;
        for (char ch : s.toCharArray()) {
            if (ch == '(') leftRem++;
            else if (ch == ')') {
                if (leftRem > 0) leftRem--;
                else rightRem++;
            }
        }

        Set<String> set = new HashSet<>();
        dfs(s, 0, 0, leftRem, rightRem, new StringBuilder(), set);
        return new ArrayList<>(set);
    }

    private void dfs(String s, int idx, int open, int lRem, int rRem, StringBuilder sb, Set<String> set) {
        if (open < 0 || lRem < 0 || rRem < 0) return;
        if (idx == s.length()) {
            if (lRem == 0 && rRem == 0 && open == 0) {
                set.add(sb.toString());
            }
            return;
        }

        char ch = s.charAt(idx);
        int len = sb.length();

        // Option 1: Remove
        if (ch == '(' && lRem > 0) {
            dfs(s, idx + 1, open, lRem - 1, rRem, sb, set);
        } else if (ch == ')' && rRem > 0) {
            dfs(s, idx + 1, open, lRem, rRem - 1, sb, set);
        }

        // Option 2: Keep
        sb.append(ch);
        int nextOpen = open + (ch == '(' ? 1 : (ch == ')' ? -1 : 0));
        dfs(s, idx + 1, nextOpen, lRem, rRem, sb, set);
        sb.setLength(len);
    }
}