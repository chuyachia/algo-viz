import "regenerator-runtime/runtime";

import { binarySearch } from "./binarySearch";

test("Binary search return correct index when target found", () => {
  let numbers = [1, 3, 4, 6, 8, 10];
  let target = 6;
  let expectedIndex = 3;
  let index = binarySearch(numbers, target);
  expect(index).toEqual(expectedIndex);
});

test("Binary search return correct index when target found 2", () => {
  let numbers = [1, 3, 4, 6, 8];
  let target = 8;
  let expectedIndex = 4;
  let index = binarySearch(numbers, target);
  expect(index).toEqual(expectedIndex);
});

test("Binary search return correct index when target not found", () => {
  let numbers = [1, 3, 4, 6, 8];
  let target = 5;
  let expectedIndex = -4;
  let index = binarySearch(numbers, target);
  expect(index).toEqual(expectedIndex);
});
