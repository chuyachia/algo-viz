import { GREY, RED } from "../../util/colors";
import { waitNFrame } from "../../util/waitNFrame";
import { Node } from "../common/node";

export function BinarySearchTree(vertexDiameter, waitFrame, p) {

  this.root;

  let canContinue = waitNFrame(waitFrame);

  this.insert = function (value) {
    let insertGenerator = this.iteInsert(value);
    let state;

    while (!state || !state.done) {
      state = insertGenerator.next();
    }
    // this.root = recInsert(this.root, value);
  }

  this.iteInsert = function * (value) {
    const newNode = new Node(value, vertexDiameter, p);
    let prev;
    let current = this.root;

    while (current !== undefined) {
      prev = current;
      current.changeColor(RED);
      while (canContinue.next().value === false) {
        yield;
      }
      current.changeColor(GREY);
      if (value > current.value) {
        current = current.rightChild;
      } else if (value < current.value) {
        current = current.leftChild;
      } else {
        return;
      }
    }


    if (prev === undefined) {
      this.root = newNode;
    } else if (value > prev.value) {
      prev.rightChild = newNode;
    } else {
      prev.leftChild = newNode;
    }
  }

  function recInsert(root, newValue) {
    if (root === undefined) {
      return new Node(newValue, vertexDiameter, p);
    }

    if (root.value < newValue) {
      root.rightChild = recInsert(root.rightChild, newValue);
    } else if (root.value > newValue) {
      root.leftChild = recInsert(root.leftChild, newValue);
    }

    return root;
  }

  this.remove = function(value) {
    let removeGenerator = this.iteRemove(value);
    let state;

    while (!state || !state.done) {
      state = removeGenerator.next();
    }
    // this.root = recRemove(this.root, value);
  }

  this.iteRemove = function* (target) {
    let prev;
    let current = this.root;
    let isRightChild;
    while (current !== undefined) {
      current.changeColor(RED);
      while (canContinue.next().value === false) {
        yield;
      }
      current.changeColor(GREY);
      if (target > current.value) {
        prev = current;
        current = current.rightChild;
        isRightChild = true;
      } else if (target < current.value) {
        prev = current;
        current = current.leftChild;
        isRightChild = false;
      } else {
        if (current.leftChild === undefined || current.rightChild === undefined) {
          let replacement =  current.leftChild === undefined? current.rightChild : current.leftChild;
          if (prev !== undefined) {
            if (isRightChild) {
              prev.rightChild = replacement;
            } else {
              prev.leftChild = replacement;
            }
          } else {
            this.root = replacement;
          }
          break;
        } else {
          let replacementValue = findMinValue(current.rightChild);
          current.value = replacementValue;
          target = replacementValue;
          prev = current;
          current = current.rightChild;
          isRightChild = true;
        }
      }
    }
  }

  function recRemove(root, value) {
    if (root === undefined) {
      return root;
    }

    if (root.value < value) {
      root.rightChild = recRemove(root.rightChild, value);
    } else if (root.value > value) {
      root.leftChild = recRemove(root.leftChild, value);
    } else {
      if (root.leftChild === undefined && root.rightChild === undefined) {
        return undefined;
      } else if (root.leftChild === undefined) {
        return root.rightChild;
      } else if (root.rightChild === undefined) {
        return root.leftChild;
      } else {
        root.value = findMinValue(root.rightChild);
        root.rightChild = recRemove(root.rightChild, root.value);
      }
    }

    return root;
  }

  function findMinValue(node) {
    if (node === undefined) {
      return null;
    }

    while (node.leftChild !== undefined) {
      node = node.leftChild;
    }

    return node.value;
  }
}