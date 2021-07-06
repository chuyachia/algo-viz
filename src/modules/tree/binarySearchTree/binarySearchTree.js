import { GREY, RED } from "../../util/colors";
import { BaseTree } from "../common/baseTree";
import { Node } from "../common/node";

BinarySearchTree.prototype = Object.create(BaseTree.prototype);

export function BinarySearchTree(waitFrame) {
  BaseTree.call(this, waitFrame);

  this.insert = function (value) {
    let insertGenerator = this.iteInsert(value);
    while (!insertGenerator.next().done) {}
  };

  this.iteInsert = function* (value) {
    const newNode = new Node(value);
    let prev;
    let current = this.root;

    while (current !== undefined) {
      prev = current;
      current.changeColor(RED);
      while (!this.canContinue.next().value) {
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
  };

  this.remove = function (value) {
    let removeGenerator = this.iteRemove(value);

    while (!removeGenerator.next().done) {}
  };

  this.iteRemove = function* (target) {
    let prev;
    let current = this.root;
    let isRightChild;
    while (current !== undefined) {
      current.changeColor(RED);
      while (!this.canContinue.next().value) {
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
        if (
          current.leftChild === undefined ||
          current.rightChild === undefined
        ) {
          replaceWithChild.call(this, current, prev, isRightChild);
          break;
        } else {
          target = swapWithMinRightChild(current, target);
          prev = current;
          current = current.rightChild;
          isRightChild = true;
        }
      }
    }
  };

  function swapWithMinRightChild(current) {
    let replacementValue = findMinValue(current.rightChild);
    current.value = replacementValue;
    return replacementValue;
  }

  function replaceWithChild(current, prev, isRightChild) {
    let replacement =
      current.leftChild === undefined ? current.rightChild : current.leftChild;
    if (prev !== undefined) {
      if (isRightChild) {
        prev.rightChild = replacement;
      } else {
        prev.leftChild = replacement;
      }
    } else {
      this.root = replacement;
    }
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
