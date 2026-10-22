class Solution {
    public int minOperations(int[] nums) {
        int n = nums.length;
        if (n <= 1) return 0;

        int p = 0;
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                p = i;
                break;
            }
        }

        boolean isIncreasing = true;
        boolean isDecreasing = true;

        for (int i = 0; i < n; i++) {
            if (nums[(p + i) % n] != i) isIncreasing = false;
            if (nums[(p - i + n) % n] != i) isDecreasing = false;
        }

        if (!isIncreasing && !isDecreasing) return -1;

        int ans = Integer.MAX_VALUE;

        if (isIncreasing) {
            ans = Math.min(ans, p);
            if (p > 0) ans = Math.min(ans, (n - p) + 2);
        }

        if (isDecreasing) {
            ans = Math.min(ans, n - p);
            ans = Math.min(ans, (p + 1) % n + 1);
        }

        return ans;
    }
}