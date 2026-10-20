class Solution {
    public int sortableIntegers(int[] nums) {
        int n = nums.length;
        int totalSum = 0;

        for (int k = 1; k <= n; k++) {
            if (n % k != 0) continue;
            if (isSortable(nums, n, k)) {
                totalSum += k;
            }
        }

        return totalSum;
    }

    private boolean isSortable(int[] nums, int n, int k) {
        int prevMax = -1;

        for (int start = 0; start < n; start += k) {
            int blockMin = nums[start];
            int blockMax = nums[start];
            int descents = 0;

            for (int i = 0; i < k; i++) {
                int curr = nums[start + i];
                int next = nums[start + (i + 1) % k];

                blockMin = Math.min(blockMin, curr);
                blockMax = Math.max(blockMax, curr);

                if (curr > next) {
                    descents++;
                }
            }

            // A block can be rotated to sorted order iff circular descents <= 1
            if (descents > 1) {
                return false;
            }

            // Cross-block condition: max of previous block <= min of current block
            if (prevMax != -1 && prevMax > blockMin) {
                return false;
            }

            prevMax = blockMax;
        }

        return true;
    }
}