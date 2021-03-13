import 'regenerator-runtime/runtime';

import { BinarySearchTree } from "./binarySearchTree";

let bst = new BinarySearchTree(0, 0, undefined);

test('Insert to empty tree add root', () => {
  bst.insert(10);
  expect(bst.root.value).toBe(10);
})

test('Insert to tree add child at the right place', () => {
  bst.insert(5);
  expect(bst.root.leftChild.value).toBe(5);
})

test('Insert to tree add child at the right place 2', () => {
  bst.insert(15);
  expect(bst.root.rightChild.value).toBe(15);
})

test('Remove works correctly', () => {
  bst.remove(10);
  expect(bst.root.value).toBe(15);
  expect(bst.root.leftChild.value).toBe(5);
})

test('Remove works correctly 2', () => {
  bst.insert(30);
  bst.insert(25);
  bst.insert(36);
  bst.insert(21);
  bst.insert(17);
  bst.remove(15);
  bst.insert(36);
  expect(checkCheckInvariant(bst.root)).toBe(true);
})

function checkCheckInvariant(root) {
  if (root === undefined) {
    return true;
  }

  let current = true;
  if (root.leftChild !== undefined) {
    current = root.value > root.leftChild.value;
  }

  if (root.rightChild !== undefined) {
    current = root.value < root.rightChild.value;
  }
  
  if (!current) {
    return false;
  }

  return checkCheckInvariant(root.rightChild) && checkCheckInvariant(root.leftChild);
}