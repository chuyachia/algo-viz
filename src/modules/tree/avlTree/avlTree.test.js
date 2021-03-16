import 'regenerator-runtime/runtime';

import { AVLTree } from './avlTree';

const tree = new AVLTree(0, 0, undefined);

test('Insert to empty tree set root node', () => {
  tree.insert(5);
  expect(tree.root.value).toBe(5);
});

test('Insert larger value add to right child', () => {
  tree.insert(8);
  expect(tree.root.rightChild.value).toBe(8);
});

test('Insert smaller value add to left child', () => {
  tree.insert(3);
  expect(tree.root.leftChild.value).toBe(3);
});

test('Insert larger value add to right child', () => {
  tree.insert(9);
  expect(tree.root.rightChild.rightChild.value).toBe(9);
});


test('Insert multiple values tree valid', () => {
  tree.insert(7);
  tree.insert(8);
  tree.insert(9);
  tree.insert(10);
  tree.insert(12);
  tree.insert(-4);
  tree.insert(-5);
  expect(checkInvariant(tree.root)).toBe(true);
});

test('Remove multiple values tree valid', () => {
  tree.remove(8);
  tree.remove(9);
  expect(checkInvariant(tree.root)).toBe(true);
});


function checkInvariant(root) {
  if (root === undefined) {
    return true;
  }

  let bst = true;
  let leftHeight = -1;
  let rightHeight = -1;

  if (root.leftChild !== undefined) {
    leftHeight = root.leftChild.height;
    bst = root.value > root.leftChild.value;
  }

  if (root.rightChild !== undefined) {
    rightHeight = root.rightChild.height;
    bst = root.value < root.rightChild.value;
  }

  let balanced = Math.abs(leftHeight - rightHeight) <= 1;
  
  if (!bst || !balanced) {
    return false;
  }

  return checkInvariant(root.rightChild) && checkInvariant(root.leftChild);
}