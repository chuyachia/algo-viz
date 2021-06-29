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
  inOrderTraversal: function() {
    const stack = new Stack();
    let current = this.root;
    current.l
    while (current !== undefined || stack.size() > 0) {
      while (current !== undefined) {
        stack.push(current);
        current = current.leftChild;
      }
      current = stack.pop();
      // Do something with current node
      current = current.rightChild;
    }
  },
}

export { BaseTree };


