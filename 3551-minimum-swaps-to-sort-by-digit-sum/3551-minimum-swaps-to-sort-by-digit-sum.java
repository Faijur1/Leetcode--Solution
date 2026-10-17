import java.util.Arrays;

class Solution {
    public int minSwaps(int[] nums) {
        int n = nums.length;
        
        // Store [digit_sum, value, original_index]
        int[][] arr = new int[n][3];
        for (int i = 0; i < n; i++) {
            arr[i][0] = getDigitSum(nums[i]);
            arr[i][1] = nums[i];
            arr[i][2] = i;
        }

        // Sort based on digit sum, breaking ties with the value itself
        Arrays.sort(arr, (a, b) -> {
            if (a[0] != b[0]) {
                return Integer.compare(a[0], b[0]);
            }
            return Integer.compare(a[1], b[1]);
        });

        // Count disjoint cycles
        boolean[] visited = new boolean[n];
        int cycles = 0;

        for (int i = 0; i < n; i++) {
            // If already visited or already in the correct position
            if (visited[i] || arr[i][2] == i) {
                continue;
            }

            // Traverse the cycle
            int curr = i;
            while (!visited[curr]) {
                visited[curr] = true;
                curr = arr[curr][2];
            }
            cycles++;
        }

        // Each cycle of length L takes (L - 1) swaps.
        // Elements already in place contribute 0 swaps.
        // Sum of (L - 1) across all non-trivial cycles:
        int swaps = 0;
        Arrays.fill(visited, false);
        for (int i = 0; i < n; i++) {
            if (visited[i] || arr[i][2] == i) {
                continue;
            }

            int cycleSize = 0;
            int curr = i;
            while (!visited[curr]) {
                visited[curr] = true;
                curr = arr[curr][2];
                cycleSize++;
            }
            if (cycleSize > 1) {
                swaps += (cycleSize - 1);
            }
        }

        return swaps;
    }

    private int getDigitSum(int num) {
        int sum = 0;
        while (num > 0) {
            sum += num % 10;
            num /= 10;
        }
        return sum;
    }
}