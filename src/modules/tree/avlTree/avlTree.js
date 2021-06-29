import { GREY, RED } from '../../util/colors';
import { Stack } from '../../util/stack';
import { BaseTree } from '../common/baseTree';
import { Node } from '../common/node';

AVLTree.prototype = Object.create(BaseTree.prototype);

function AVLTree(waitFrame) {
  BaseTree.call(this, waitFrame);

  this.insert = function (value) {
    let insertGenerator = this.iteInsert(value);
    let state;

    while (!state || !state.done) {
      state = insertGenerator.next();
    }
  }


  this.remove = function (value) {
    let removeGenerator = this.iteRemove(value);
    let state;

    while (!state || !state.done) {
      state = removeGenerator.next();
    }
  }


  this.iteInsert = function* (value) {
    const backtrack = new Stack();
    let current = this.root;
    while (current !== undefined) {
      current.changeColor(RED);
      while (this.canContinue.next().value === false) {
        yield;
      }
      current.changeColor(GREY);

      backtrack.push(current);
      if (value > current.value) {
        current = current.rightChild;
      } else if (value < current.value) {
        current = current.leftChild;
      } else {
        return;
      }
    }

    const newNode = new Node(value);

    let prev = newNode;
    while (backtrack.size() > 0) {
      current = backtrack.pop();
      if (prev !== undefined) {
        if (prev.value < current.value) {
          current.leftChild = prev;
        } else {
          current.rightChild = prev;
        }
      }

      updateHeight(current);
      let balanceGen = this.balance(current);
      let state;
      while (state === undefined || !state.done) {
        state = balanceGen.next();
        yield;
      }

      current = state.value;
      prev = current;
    }

    this.root = prev;
  }

  this.iteRemove = function* (value) {
    const backtrack = new Stack();
    let current = this.root;
    let prev;

    while (current !== undefined) {
      current.changeColor(RED);
      while (this.canContinue.next().value === false) {
        yield;
      }
      current.changeColor(GREY);

      if (value > current.value) {
        backtrack.push(current);
        current = current.rightChild;
      } else if (value < current.value) {
        backtrack.push(current);
        current = current.leftChild;
      } else {
        if (current.leftChild === undefined || current.rightChild === undefined) {
          let replacement = current.leftChild === undefined ? current.rightChild : current.leftChild;
          if (backtrack.size() > 0) {
            if (current.value >= backtrack.peek().value) {
              // equal allow here because root value was changed to replacemnet value, which can be the parent of the node to delete
              backtrack.peek().rightChild = replacement;
            } else {
              backtrack.peek().leftChild = replacement;
            }
          } else {
            prev = replacement;
          }
          break;
        } else {
          let replacementValue = findMinValue(current.rightChild);
          current.value = replacementValue;
          backtrack.push(current);
          value = replacementValue;
          current = current.rightChild;
        }
      }
    }

    while (backtrack.size() > 0) {
      current = backtrack.pop();
      if (prev !== undefined) {
        if (prev.value > current.value) {
          current.rightChild = prev;
        } else {
          current.leftChild = prev;
        }
      }

      updateHeight(current);
      let balanceGen = this.balance(current);
      let state;
      while (state === undefined || !state.done) {
        state = balanceGen.next();
        yield;
      }

      current = state.value;
      prev = current;
    }

    this.root = prev;
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

  function updateHeight(root) {
    let leftHeight = root.leftChild ? root.leftChild.height : -1;
    let rightHeight = root.rightChild ? root.rightChild.height : -1;
    root.height = 1 + Math.max(leftHeight, rightHeight);
    root.balanceFactor = rightHeight - leftHeight;
  }

  this.balance = function * (root) {
    root.changeColor(RED);
    while (this.canContinue.next().value === false) {
      yield;
    }
    if (root.balanceFactor > 1) {
      if (root.rightChild.balanceFactor >= 0) {
        // right right case
        root.changeColor(RED);
        root.showLeftRotationArrow = true;
        while (this.canContinue.next().value === false) {
          yield;
        }
        root.showLeftRotationArrow = false;
        root.changeColor(GREY);

        return leftRotation(root);
      } else {
        // right left case
        root.rightChild.changeColor(RED);
        root.rightChild.showRightRotationArrow = true;
        while (this.canContinue.next().value === false) {
          yield;
        }
        root.rightChild.changeColor(GREY);
        root.rightChild.showRightRotationArrow = false;
        
        root.rightChild = rightRotation(root.rightChild);

        root.changeColor(RED);
        root.showLeftRotationArrow = true;
        while (this.canContinue.next().value === false) {
          yield;
        }
        root.showLeftRotationArrow = false;
        root.changeColor(GREY);

        return leftRotation(root);
      }
    } else if (root.balanceFactor < -1) {
      if (root.leftChild.balanceFactor <= 0) {
        // left left case
        root.changeColor(RED);
        root.showRightRotationArrow = true;
        while (this.canContinue.next().value === false) {
          yield;
        }
        root.showRightRotationArrow = false;
        root.changeColor(GREY);

        return rightRotation(root);
      } else {
        // left right case
        root.leftChild.changeColor(RED);
        root.leftChild.showLeftRotationArrow = true;
        while (this.canContinue.next().value === false) {
          yield;
        }
        root.leftChild.showLeftRotationArrow = false;
        root.leftChild.changeColor(GREY);

        root.leftChild = leftRotation(root.leftChild);

        root.changeColor(RED);
        root.showRightRotationArrow = true;
        while (this.canContinue.next().value === false) {
          yield;
        }
        root.showRightRotationArrow = false;
        root.changeColor(GREY);

        return rightRotation(root);
      }
    }
    root.changeColor(GREY);

    return root;
  }

  function rightRotation(root) {
    let newRoot = root.leftChild;
    root.leftChild = newRoot.rightChild;
    newRoot.rightChild = root;
    updateHeight(root);
    updateHeight(newRoot);
    return newRoot;
  }


  function leftRotation(root) {
    let newRoot = root.rightChild;
    root.rightChild = newRoot.leftChild;
    newRoot.leftChild = root;
    updateHeight(root);
    updateHeight(newRoot);
    return newRoot;
  }
}

export { AVLTree };