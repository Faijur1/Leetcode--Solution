class Solution {
    public String maxSumOfSquares(int num, int sum) {
        // A valid num-digit positive integer must have sum in [1, 9 * num]
        if (sum < 1 || (long) num * 9 < sum) {
            return "";
        }

        int q = sum / 9;
        int r = sum % 9;

        StringBuilder sb = new StringBuilder(num);

        // Append as many 9s as possible
        for (int i = 0; i < q; i++) {
            sb.append('9');
        }

        // Append the remaining non-zero digit, if any
        if (r > 0) {
            sb.append((char) ('0' + r));
        }

        // Fill the rest with 0s to reach length `num`
        while (sb.length() < num) {
            sb.append('0');
        }

        return sb.toString();
    }
}