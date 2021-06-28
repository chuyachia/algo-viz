import { Edge } from "../../graph/common/edge";
import { Stack } from "../../util/stack";

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
  
      if (animationPlaying && animationGenerator !== undefined) {
        if (animationGenerator.next().done) {
          animationPlaying = false;
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
      if (animationPlaying) {
        return;
      }
  
      if (p.keyCode === p.ENTER) {
        validateInputAndInsert();
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
      animationPlaying = true;
      inputElement.attribute('disabled', '');
      animationGenerator = tree.iteRemove(value);
    }
  
    function validateInputAndInsert() {
      const num = parseInt(inputElement.value());
      inputElement.value('');
      if (!Number.isNaN(num)) {
        animationPlaying = true;
        inputElement.attribute('disabled', '');
        animationGenerator = tree.iteInsert(num);
      }
    }
  
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
}