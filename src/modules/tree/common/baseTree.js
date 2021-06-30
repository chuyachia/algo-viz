import { GREY, RED } from '../../util/colors';
import { Stack } from '../../util/stack';
import { waitNFrame } from '../../util/waitNFrame';
import { Node } from './node';

function BaseTree(waitFrame) {
  /**
   * @type {Node}
   */
  this.root;
  this.canContinue = waitNFrame(waitFrame);
}

BaseTree.prototype = {
  inOrderTraverse: function * () {
    const stack = new Stack();
    let current = this.root;
    while (current !== undefined || stack.size() > 0) {
      while (current !== undefined) {
        stack.push(current);
        current = current.leftChild;
      }
      current = stack.pop();
      current.changeColor(RED);
      while (!this.canContinue.next().value) {
        yield;
      }
      current.changeColor(GREY);
      current = current.rightChild;
    }
  },
  preOrderTraverse: function * () {
    const stack = new Stack();
    stack.push(this.root);
    while (stack.size() > 0) {
      let current = stack.pop();
      if (current === undefined) continue;

      current.changeColor(RED);
      while (!this.canContinue.next().value) {
        yield;
      }
      current.changeColor(GREY);
      stack.push(current.rightChild);
      stack.push(current.leftChild);
    }
  },
  postOrderTraverse: function * () {
    const stack1 = new Stack();
    const stack2 = new Stack();
    stack1.push(this.root);
    while(stack1.size() > 0) {
      let current = stack1.pop();
      if (current === undefined) continue;
      stack1.push(current.leftChild);
      stack1.push(current.rightChild);
      stack2.push(current);
    }
    while(stack2.size() > 0) {
      let current = stack2.pop();
      current.changeColor(RED);
      while (!this.canContinue.next().value) {
        yield;
      }
      current.changeColor(GREY);
    }
  },
  levelOrderTraverse: function * () {
    const queue = []
    queue.push(this.root);
    while(queue.length > 0) {
      let levelCount = queue.length;
      while (levelCount-- > 0) {
        let current = queue.shift();
        if (current === undefined) continue;
        current.changeColor(RED);
        while (!this.canContinue.next().value) {
          yield;
        }
        current.changeColor(GREY);

        queue.push(current.leftChild);
        queue.push(current.rightChild);
      }
    }
  }
}

export { BaseTree };


