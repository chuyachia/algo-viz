/**
 * Returns the index of the found element. If no element found, return -(insertionPosition+1) ;
 * @param {number[]} nums
 * @param {number} target
 *
 */
export function binarySearch(nums, target) {
  let start = 0;
  let end = nums.length;
  while (start < end) {
    let mid = start + Math.floor((end - start) / 2);
    if (nums[mid] < target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  if (nums[start] === target) {
    return start;
  } else {
    return -(start + 1);
  }
}
