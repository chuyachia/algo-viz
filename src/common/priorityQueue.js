export function PriorityQueue(comparator) {
  let elements = [];
  let elementsMap = {};

  this.peek = function() {
    return elements[0];
  }

  this.poll = function() {
    swap(0, elements.length - 1);
    let rtn = elements.pop();
    bubbleDown(0);
    return rtn;
  }

  this.add = function(e) {
    elements.push(e);
    bubbleUp(elements.length - 1);
  }

  this.size = function() {
    return elements.length;
  }

  function bubbleUp(i) {
    let parent = getParent(i);
    while (i > 0 && comparator(elements[i], elements[parent]) < 0) {
      swap(i, parent);
      i = parent;
      parent = getParent(i);
    }
  }


  function bubbleDown(i) {
    let leftChild = getLeftChild(i);
    let rightChild = getRightChild(i);
    while ((leftChild < elements.length && comparator(elements[i], elements[leftChild]) > 0) ||
      (rightChild < elements.length && comparator(elements[i], elements[rightChild]) < 0)) {
      if (comparator(elements[i], elements[leftChild]) > 0) {
        swap(i, leftChild);
        i = leftChild;
      } else {
        swap(i, rightChild);
        i = rightChild;
      }

      leftChild = getLeftChild(i);
      rightChild = getRightChild(i);
    }
  }

  function swap(i, j) {
    var tmp = elements[i];
    elements[i] = elements[j];
    elements[j] = tmp;
  }

  function getLeftChild(i) {
    return 2 * i + 1;
  }

  function getRightChild(i) {
    return 2 * i + 2;
  }

  function getParent(i) {
    return i % 2 == 0 ? (i - 2) / 2 : (i - 1) / 2;
  }
}