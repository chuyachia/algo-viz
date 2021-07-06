import { createTreeSketch } from "../common/treeSketch";
import { AVLTree } from "./avlTree";

export const sketch = createTreeSketch(new AVLTree(50));

export const explainText =
  "<p><strong>AVL tree</strong> is a self-balancing binary search tree. A balanced tree is a tree in which the difference between the height of the right subtree and the left subtree (balance factor) does not exceed 1. The height of a tree is defined as the number of edges leading to the furthest node from the root node.</p><p>AVL tree achieves to stay balanced through tracking the balance factor of each node during the backtracking phase of insert or remove. If the balance factor exceeds 1, the tree performs a combination left or right rotations to rebalance the subtrees.</p>";
