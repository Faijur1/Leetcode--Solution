import java.util.Arrays;

class Solution {
    public long maxAlternatingSum(int[] nums) {
        int n = nums.length;
        
        // Convert all elements to their absolute values
        for (int i = 0; i < n; i++) {
            nums[i] = Math.abs(nums[i]);
        }
        
        // Sort in non-decreasing order
        Arrays.sort(nums);
        
        int negCount = n / 2;
        long totalScore = 0;
        
        // Subtract squares of the smallest n / 2 elements
        for (int i = 0; i < negCount; i++) {
            totalScore -= (long) nums[i] * nums[i];
        }
        
        // Add squares of the largest ceil(n / 2) elements
        for (int i = negCount; i < n; i++) {
            totalScore += (long) nums[i] * nums[i];
        }
        
        return totalScore;
    }
}