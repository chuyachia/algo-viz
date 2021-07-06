import { createTreeSketch } from "../common/treeSketch";
import { BinarySearchTree } from "./binarySearchTree";

export const sketch = createTreeSketch(new BinarySearchTree(30));

export const explainText =
  "<p><strong>Binary search tree</strong> is a tree data structure where a node has at most one left child and one right child. The value of the left child and all of its children (left subtree) are smaller than that of the parent. The value of the right child and all of its children (right subtree) are all greater then that of the parent.</p><p>To insert a new node, the algorithm starts at the root node and compares the value of the node to insert to the value of the root node. If the value of the node to insert is greater, continue the comparison with the right child. If it's smaller, continue with the left child. The procedure ends when an empty left or right child is found. The new node is inserted at this position.</p><p>To remove a node, a similar procedure is performed first to locate the node to remove. Once located, if the node to remove has only one child, the child will  replace the node to remove. If the node to remove has both left and right child, the replacement can be either the smallest node in the right subtree or the largest node in the left subtree.</p>";
