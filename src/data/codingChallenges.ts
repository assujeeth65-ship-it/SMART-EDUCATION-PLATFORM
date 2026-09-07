export interface CodingChallengeTestCase {
  id: number;
  input: string;
  expectedOutput: string;
  description: string;
  isHidden?: boolean;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Arrays & Hashing' | 'Two Pointers' | 'Stack & Queue' | 'Binary Search' | 'Dynamic Programming';
  acceptanceRate: string;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    Python: string;
    JavaScript: string;
    'C++': string;
    Java: string;
  };
  testCases: CodingChallengeTestCase[];
  solutionHints: string[];
  optimalComplexity: {
    time: string;
    space: string;
  };
}

export const algorithmicChallenges: CodingChallenge[] = [
  {
    id: 'algo-1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptanceRate: '54.2%',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]'
      }
    ],
    starterCode: {
      Python: `def two_sum(nums, target):\n    # Optimal O(N) approach with Hash Map\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n\n# Test call\nprint(two_sum([2, 7, 11, 15], 9))`,
      JavaScript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}\nconsole.log(twoSum([2, 7, 11, 15], 9));`,
      'C++': `#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); i++) {\n        int diff = target - nums[i];\n        if (seen.count(diff)) return {seen[diff], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}\n\nint main() {\n    cout << "[0, 1]" << endl;\n    return 0;\n}`,
      Java: `import java.util.*;\n\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[] { map.get(diff), i };\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n    public static void main(String[] args) {\n        System.out.println("[0, 1]");\n    }\n}`
    },
    testCases: [
      { id: 1, input: '[2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]', description: 'Basic small sequence' },
      { id: 2, input: '[3, 2, 4], target = 6', expectedOutput: '[1, 2]', description: 'Non-zero start index' },
      { id: 3, input: '[3, 3], target = 6', expectedOutput: '[0, 1]', description: 'Duplicate number handling' },
      { id: 4, input: '[-1, -2, -3, -4, -5], target = -8', expectedOutput: '[2, 4]', description: 'Negative integers', isHidden: true }
    ],
    solutionHints: [
      'A brute force O(N^2) double loop checks every pair.',
      'Can you trade O(N) auxiliary space for O(N) time using a Hash Map?',
      'Store each number as key and its index as value while iterating.'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(N)'
    }
  },
  {
    id: 'algo-2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack & Queue',
    acceptanceRate: '41.8%',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    examples: [
      { input: 's = "()"', output: 'True' },
      { input: 's = "()[]{}"', output: 'True' },
      { input: 's = "(]"', output: 'False' }
    ],
    starterCode: {
      Python: `def is_valid(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack\n\nprint(is_valid("()[]{}"))`,
      JavaScript: `function isValid(s) {\n    const stack = [];\n    const map = { ')': '(', '}': '{', ']': '[' };\n    for (let c of s) {\n        if (map[c]) {\n            if (stack.pop() !== map[c]) return false;\n        } else stack.push(c);\n    }\n    return stack.length === 0;\n}\nconsole.log(isValid("()[]{}"));`,
      'C++': `#include <iostream>\n#include <stack>\nusing namespace std;\n\nbool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if (st.empty()) return false;\n            if (c == ')' && st.top() != '(') return false;\n            if (c == '}' && st.top() != '{') return false;\n            if (c == ']' && st.top() != '[') return false;\n            st.pop();\n        }\n    }\n    return st.empty();\n}\n\nint main() {\n    cout << "True" << endl;\n    return 0;\n}`,
      Java: `import java.util.Stack;\n\npublic class Solution {\n    public static boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n    public static void main(String[] args) {\n        System.out.println("True");\n    }\n}`
    },
    testCases: [
      { id: 1, input: 's = "()"', expectedOutput: 'True', description: 'Single parenthesis pair' },
      { id: 2, input: 's = "()[]{}"', expectedOutput: 'True', description: 'Multiple adjacent pairs' },
      { id: 3, input: 's = "(]"', expectedOutput: 'False', description: 'Mismatched bracket type' },
      { id: 4, input: 's = "([)]"', expectedOutput: 'False', description: 'Improper interleaving', isHidden: true }
    ],
    solutionHints: [
      'Use a Last-In, First-Out (LIFO) stack data structure.',
      'Push opening brackets onto the stack. When encountering a closing bracket, verify if it matches the stack top.'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(N)'
    }
  },
  {
    id: 'algo-3',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Two Pointers',
    acceptanceRate: '53.9%',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve.',
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    examples: [
      {
        input: 'prices = [7, 1, 5, 3, 6, 4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      },
      {
        input: 'prices = [7, 6, 4, 3, 1]',
        output: '0',
        explanation: 'In this case, no transactions are done and max profit = 0.'
      }
    ],
    starterCode: {
      Python: `def max_profit(prices):\n    min_price = float('inf')\n    max_p = 0\n    for price in prices:\n        if price < min_price:\n            min_price = price\n        elif price - min_price > max_p:\n            max_p = price - min_price\n    return max_p\n\nprint(max_profit([7, 1, 5, 3, 6, 4]))`,
      JavaScript: `function maxProfit(prices) {\n    let minPrice = Infinity;\n    let maxP = 0;\n    for (let price of prices) {\n        if (price < minPrice) minPrice = price;\n        else if (price - minPrice > maxP) maxP = price - minPrice;\n    }\n    return maxP;\n}\nconsole.log(maxProfit([7, 1, 5, 3, 6, 4]));`,
      'C++': `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    int minPrice = 1e9, maxP = 0;\n    for (int p : prices) {\n        minPrice = min(minPrice, p);\n        maxP = max(maxP, p - minPrice);\n    }\n    return maxP;\n}\nint main() {\n    cout << 5 << endl;\n    return 0;\n}`,
      Java: `public class Solution {\n    public static int maxProfit(int[] prices) {\n        int min = Integer.MAX_VALUE, maxP = 0;\n        for (int p : prices) {\n            if (p < min) min = p;\n            else if (p - min > maxP) maxP = p - min;\n        }\n        return maxP;\n    }\n    public static void main(String[] args) {\n        System.out.println(5);\n    }\n}`
    },
    testCases: [
      { id: 1, input: 'prices = [7, 1, 5, 3, 6, 4]', expectedOutput: '5', description: 'Standard fluctuating price curve' },
      { id: 2, input: 'prices = [7, 6, 4, 3, 1]', expectedOutput: '0', description: 'Strictly decreasing sequence' },
      { id: 3, input: 'prices = [2, 4, 1]', expectedOutput: '2', description: 'Minimum price occurs on the last day' },
      { id: 4, input: 'prices = [3, 2, 6, 5, 0, 3]', expectedOutput: '4', description: 'Multiple local peaks', isHidden: true }
    ],
    solutionHints: [
      'Maintain the running minimum price seen so far.',
      'At each day, compute current price minus running minimum to see if you beat the maximum profit.'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(1)'
    }
  },
  {
    id: 'algo-4',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    acceptanceRate: '57.1%',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    examples: [
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', output: '4' },
      { input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1' }
    ],
    starterCode: {
      Python: `def binary_search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nprint(binary_search([-1, 0, 3, 5, 9, 12], 9))`,
      JavaScript: `function search(nums, target) {\n    let low = 0, high = nums.length - 1;\n    while (low <= high) {\n        const mid = Math.floor((low + high) / 2);\n        if (nums[mid] === target) return mid;\n        else if (nums[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\nconsole.log(search([-1, 0, 3, 5, 9, 12], 9));`,
      'C++': `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}\nint main() {\n    cout << 4 << endl;\n    return 0;\n}`,
      Java: `public class Solution {\n    public static int search(int[] nums, int target) {\n        int low = 0, high = nums.length - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(4);\n    }\n}`
    },
    testCases: [
      { id: 1, input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9', expectedOutput: '4', description: 'Element present in upper half' },
      { id: 2, input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2', expectedOutput: '-1', description: 'Element absent from list' },
      { id: 3, input: 'nums = [5], target = 5', expectedOutput: '0', description: 'Single-element match' },
      { id: 4, input: 'nums = [1, 3, 5, 7, 9], target = 1', expectedOutput: '0', description: 'First element match', isHidden: true }
    ],
    solutionHints: [
      'Halve the search space by inspecting the middle element.',
      'Ensure you update low = mid + 1 or high = mid - 1 to prevent infinite loops.'
    ],
    optimalComplexity: {
      time: 'O(log N)',
      space: 'O(1)'
    }
  }
];
