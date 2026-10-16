import java.util.Arrays;

class Solution {
    private static final int MOD = 1_000_000_007;

    static class SegmentTree {
        long[] sum;
        long[] sqSum;
        long[] lazy;

        SegmentTree(int n) {
            sum = new long[4 * n];
            sqSum = new long[4 * n];
            lazy = new long[4 * n];
        }

        private void pushUp(int node) {
            int left = 2 * node, right = 2 * node + 1;
            sum[node] = (sum[left] + sum[right]) % MOD;
            sqSum[node] = (sqSum[left] + sqSum[right]) % MOD;
        }

        private void apply(int node, int l, int r, long val) {
            int len = r - l + 1;
            val %= MOD;
            
            // (d + val)^2 = d^2 + 2*val*d + val^2
            long term1 = sqSum[node];
            long term2 = (2 * val % MOD) * sum[node] % MOD;
            long term3 = (val * val % MOD) * len % MOD;
            sqSum[node] = (term1 + term2 + term3) % MOD;

            sum[node] = (sum[node] + val * len) % MOD;
            lazy[node] = (lazy[node] + val) % MOD;
        }

        private void pushDown(int node, int l, int r) {
            if (lazy[node] != 0) {
                int mid = (l + r) >> 1;
                apply(2 * node, l, mid, lazy[node]);
                apply(2 * node + 1, mid + 1, r, lazy[node]);
                lazy[node] = 0;
            }
        }

        public void update(int node, int l, int r, int ql, int qr, int val) {
            if (ql <= l && r <= qr) {
                apply(node, l, r, val);
                return;
            }
            pushDown(node, l, r);
            int mid = (l + r) >> 1;
            if (ql <= mid) {
                update(2 * node, l, mid, ql, qr, val);
            }
            if (qr > mid) {
                update(2 * node + 1, mid + 1, r, ql, qr, val);
            }
            pushUp(node);
        }
    }

    public int sumCounts(int[] nums) {
        int n = nums.length;
        SegmentTree st = new SegmentTree(n);

        // Find max element to size the last-seen array properly
        int maxVal = 0;
        for (int x : nums) {
            if (x > maxVal) maxVal = x;
        }

        int[] last = new int[maxVal + 1]; // 1-based positions
        long totalSum = 0;

        for (int j = 0; j < n; j++) {
            int x = nums[j];
            int prevIdx = last[x]; // 0 if not seen yet
            int left = prevIdx + 1;
            int right = j + 1;

            // Increment d[i] by 1 for all i in [left, right]
            st.update(1, 1, n, left, right, 1);
            last[x] = j + 1;

            // Root sqSum holds sum of squares of all subarrays ending at index j
            totalSum = (totalSum + st.sqSum[1]) % MOD;
        }

        return (int) totalSum;
    }
}