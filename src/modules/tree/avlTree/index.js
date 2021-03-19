import { Edge } from "../../graph/common/edge";
import { Stack } from "../../util/stack";
import { AVLTree } from "./avlTree";


export function sketch(p) {
  const canvasWidth = 550;
  const canvasHeight = 550;
  const vertexDiameter = 30;
  const xTranslate = canvasWidth / 2;
  const yTranslate = 100;
  let inserting;
  let insertGenerator;
  let removeGenerator;
  let removing;

  let tree = new AVLTree(vertexDiameter, 50, p);
  let inputElement;

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    inputElement = p.createInput('');
    inputElement.attribute('placeholder', 'Enter number');
    inputElement.position(10, 40);
  }

  p.draw = function () {
    p.background(255, 255, 255);
    p.text('Enter a number to insert a new node.\n' +
      'Click on a node to remove it.', 10, 10);

    if (inserting && insertGenerator !== undefined) {
      if (insertGenerator.next().done) {
        inserting = false;
        inputElement.removeAttribute('disabled');
      }
    } else if (removing && removeGenerator !== undefined) {
      if (removeGenerator.next().done) {
        removing = false;
        inputElement.removeAttribute('disabled');
      }
    }

    if (tree.root !== undefined) {
      tree.root.index = 1;
      p.translate(xTranslate, yTranslate);
      recDisplayNode(tree.root);
    }
  }

  p.keyReleased = function () {
    if (inserting || removing) {
      return;
    }

    if (p.keyCode === p.ENTER) {
      validateInputAndInsert();
    }
  }

  p.mousePressed = function () {
    if (inserting || removing) {
      return;
    }

    const closestNode = findClosestNode();
    if (closestNode !== undefined) {
      removeNode(closestNode.value);
    }
  }

  function findClosestNode() {
    const stack = new Stack();
    stack.push(tree.root);
    while (stack.size() > 0) {
      const current = stack.pop();
      if (current === undefined) {
        continue;
      }
      if (p.dist(p.mouseX - xTranslate, p.mouseY - yTranslate, current.x, current.y) < vertexDiameter) {
        return current;
      }
      stack.push(current.leftChild);
      stack.push(current.rightChild);
    }

    return undefined;
  }

  function removeNode(value) {
    removing = true;
    inputElement.attribute('disabled', '');
    removeGenerator = tree.iteRemove(value);
  }

  function validateInputAndInsert() {
    const num = parseInt(inputElement.value());
    inputElement.value('');
    if (!Number.isNaN(num)) {
      inserting = true;
      inputElement.attribute('disabled', '');
      insertGenerator = tree.iteInsert(num);
    }
  }

  function recDisplayNode(root) {
    if (root === undefined) {
      return;
    }
    const { x, y } = getCoordinate(root.index);
    root.x = x;
    root.y = y;
    root.display();

    if (root.leftChild !== undefined) {
      root.leftChild.index = 2 * root.index;
      const { x, y } = getCoordinate(root.leftChild.index);
      root.leftChild.x = x;
      root.leftChild.y = y;
      root.leftChildEdge = new Edge(1, root, root.leftChild, vertexDiameter, p, false);
      root.leftChildEdge.display();
      recDisplayNode(root.leftChild);
    }
    if (root.rightChild !== undefined) {
      root.rightChild.index = 2 * root.index + 1;
      const { x, y } = getCoordinate(root.rightChild.index);
      root.rightChild.x = x;
      root.rightChild.y = y;
      root.rightChildEdge = new Edge(1, root, root.rightChild, vertexDiameter, p, false);
      root.rightChildEdge.display();
      recDisplayNode(root.rightChild);
    }
  }

  function getCoordinate(index) {
    const row = Math.floor(Math.log2(index));
    let x, y;

    if (row === 0) {
      x = 0;
      y = 0;
    } else {
      const orderInRow = index - Math.pow(2, row);
      const nInRow = Math.pow(2, row);
      const rowWidth = canvasWidth / 3 + vertexDiameter * row * 2;
      const rowStart = -rowWidth / 2;
      const widthIncrement = rowWidth / (nInRow - 1);
      x = rowStart + widthIncrement * orderInRow;
      y = row * vertexDiameter * 2;
    }

    return { x, y };
  }
}

export const explainText = '<p><strong>AVL tree</strong> is a self-balancing binary search tree. A balanced tree is a tree in which the difference between the height of the right subtree and the left subtree (balance factor) does not exceed 1. The height of a tree is defined as the number of edges leading to the furthest node from the root node.</p><p>AVL tree achieves to stay balanced through tracking the balance factor of each node during the backtracking phase of insert or remove. If the balance factor exceeds 1, the tree performs a combination left or right rotations to rebalance the subtrees.</p>';