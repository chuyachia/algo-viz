import { Edge } from "../../graph/common/edge";
import { Stack } from "../../util/stack";
import { Node } from "./node";

export function createTreeSketch(tree) {

  return function sketch(p) {
    const canvasWidth = 550;
    const canvasHeight = 550;
    const vertexDiameter = 30;
    const xTranslate = canvasWidth / 2;
    const yTranslate = 100;
    let animationPlaying = false; 
    let animationGenerator;
  
    let inputElement;
    let buttons = [];
  
    p.setup = function () {
      p.createCanvas(canvasWidth, canvasHeight);
      inputElement = p.createInput('');
      inputElement.attribute('placeholder', 'Enter number');
      inputElement.position(10, 40);
      let inOrderButton = p.createButton('Inorder');
      inOrderButton.position(10, 80);
      inOrderButton.mousePressed(inOrderTraverse); 
      buttons.push(inOrderButton);

      let preOrderButton = p.createButton('Preorder');
      preOrderButton.position(10, 120);
      preOrderButton.mousePressed(preOrderTraverse); 
      buttons.push(preOrderButton);

      let postOrderButton = p.createButton('Postorder');
      postOrderButton.position(10, 160);
      postOrderButton.mousePressed(postOrderTraverse); 
      buttons.push(postOrderButton);

      let levelOrderButton = p.createButton('Levelorder');
      levelOrderButton.position(10, 200);
      levelOrderButton.mousePressed(levelOrderTraverse); 
      buttons.push(levelOrderButton);

    }
  
    p.draw = function () {
      p.background(255, 255, 255);
      p.text('Enter a number to insert a new node.' +
        ' Click on a node to remove it.\nClick on button to see traversal', 10, 10);
  
      if (animationPlaying && animationGenerator !== undefined) {
        if (animationGenerator.next().done) {
          animationPlaying = false;
          enableInteraction();
        }
      }
  
      if (tree.root !== undefined) {
        tree.root.index = 1;
        p.translate(xTranslate, yTranslate);
        recDisplayNode(tree.root);
      }
    }
  
    p.keyReleased = function () {
      if (animationPlaying) {
        return;
      }
  
      if (p.keyCode === p.ENTER) {
        validateInputAndInsertNode();
      }
    }
  
    p.mousePressed = function () {
      if (animationPlaying) {
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
      disableInteraction();
      animationPlaying = true;
      animationGenerator = tree.iteRemove(value);
    }
  
    function validateInputAndInsertNode() {
      const num = parseInt(inputElement.value());
      inputElement.value('');
      if (!Number.isNaN(num)) {
        disableInteraction();
        animationPlaying = true;
        animationGenerator = tree.iteInsert(num);
      }
    }

    function inOrderTraverse() {
      disableInteraction();
      animationPlaying = true;
      animationGenerator = tree.inOrderTraverse();
    }
  
    function preOrderTraverse() {
      disableInteraction();
      animationPlaying = true;
      animationGenerator = tree.preOrderTraverse();
    }

    function postOrderTraverse() {
      disableInteraction();
      animationPlaying = true;
      animationGenerator = tree.postOrderTraverse();
    }

    function levelOrderTraverse() {
      disableInteraction();
      animationPlaying = true;
      animationGenerator = tree.levelOrderTraverse();
    }

    /**
     * 
     * @param {Node} root 
     * @returns 
     */
    function recDisplayNode(root) {
      if (root === undefined) {
        return;
      }
      const { x, y } = getCoordinate(root.index);
      root.x = x;
      root.y = y;
      root.display(p, vertexDiameter);

      if (root.leftChild !== undefined) {
        root.leftChild.index = 2 * root.index;
        const { x, y } = getCoordinate(root.leftChild.index);
        root.leftChild.x = x;
        root.leftChild.y = y;
        root.leftChildEdge = new Edge(1, root, root.leftChild);
        root.leftChildEdge.display(p, vertexDiameter, false);
        recDisplayNode(root.leftChild);
      }
      if (root.rightChild !== undefined) {
        root.rightChild.index = 2 * root.index + 1;
        const { x, y } = getCoordinate(root.rightChild.index);
        root.rightChild.x = x;
        root.rightChild.y = y;
        root.rightChildEdge = new Edge(1, root, root.rightChild);
        root.rightChildEdge.display(p, vertexDiameter, false);
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

    function disableInteraction() {
      inputElement.attribute('disabled', '');
      for (let button of buttons) {
        button.attribute('disabled', '');
      }
    }

    function enableInteraction() {
      inputElement.removeAttribute('disabled');
      for (let button of buttons) {
        button.removeAttribute('disabled');
      }
    }
  }
}