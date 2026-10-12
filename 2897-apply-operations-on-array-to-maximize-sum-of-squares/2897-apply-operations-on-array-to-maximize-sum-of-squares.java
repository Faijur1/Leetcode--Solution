import java.util.List;

class Solution {
    public int maxSum(List<Integer> nums, int k) {
        long MOD = 1_000_000_007L;
        int[] bitCount = new int[30];

        // Step 1: Count the frequency of each bit across all numbers
        for (int num : nums) {
            for (int b = 0; b < 30; b++) {
                if (((num >> b) & 1) == 1) {
                    bitCount[b]++;
                }
            }
        }

        long totalSum = 0;

        // Step 2: Construct the k largest elements and sum their squares
        for (int i = 0; i < k; i++) {
            long currentVal = 0;
            for (int b = 0; b < 30; b++) {
                if (bitCount[b] > 0) {
                    currentVal |= (1L << b);
                    bitCount[b]--;
                }
            }
            totalSum = (totalSum + (currentVal % MOD) * (currentVal % MOD)) % MOD;
        }

        return (int) totalSum;
    }
}