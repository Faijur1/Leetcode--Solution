class Solution {
    public int sumOfSquares(int[] nums) {
        int n = nums.length;
        int sum = 0;
        
        for (int i = 1; i <= n; i++) {
            // Check if 1-based index i divides n
            if (n % i == 0) {
                // Access element at 0-based index i - 1
                int val = nums[i - 1];
                sum += val * val;
            }
        }
        
        return sum;
    }
}