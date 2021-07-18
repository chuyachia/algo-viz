import { Stack } from "../../util/stack";

function BPlusTreeNode(isLeaf) {
  this.isLeaf = isLeaf;
  /**
   * @type {BPlusTreeNode}
   */
  this.next;
  /**
   * @type {BPlusTreeEntry}
   */
  this.entry = new BPlusTreeEntry(undefined, isLeaf);

  this.findPreviousEntry = function (val) {
    let prev = this.entry;
    let current = prev.next;

    while (current !== undefined && current.value < val) {
      prev = current;
      current = current.next;
    }

    return prev;
  };

  this.findNthEntry = function (n) {
    let current = this.entry;
    let i = 0;
    while (i++ <= n && current !== undefined) {
      current = current.next;
    }

    return current;
  };
}

function BPlusTreeEntry(value, isLeaf) {
  this.value = value;
  this.isLeaf = isLeaf;
  /**
   * @type {BPlusTreeEntry}
   */
  this.next;
  /**
   * @type {BPlusTreeNode}
   */
  this.child;
  this.childCount = 0;

  this.addToNext = function (val) {
    let newEntry = new BPlusTreeEntry(val, this.isLeaf);
    let tmp = this.next;
    this.next = newEntry;
    newEntry.next = tmp;

    return newEntry;
  };
}

export function BPlusTree(order) {
  this.root = new BPlusTreeNode(false);
  this.order = order;

  this.insert = function (val) {
    const parents = new Stack();

    let levelRoot = this.root;
    while (levelRoot !== undefined) {
      let prevEntry = levelRoot.findPreviousEntry(val);

      if (!prevEntry.isLeaf) {
        parents.push(prevEntry);
        if (prevEntry.child === undefined) {
          prevEntry.child = new BPlusTreeNode(true);
        }
        levelRoot = prevEntry.child;
      } else {
        prevEntry.addToNext(val);
        levelRoot = undefined;
      }
    }

    parents.peek().childCount++;

    while (parents.peek().childCount > 2 * this.order) {
      /**
       * @type {BPlusTreeEntry}
       */
      let currentParent = parents.pop();
      let originalNode = currentParent.child;
      let leftLastEntry = originalNode.findNthEntry(order - 1);
      let rightFirstEntry = leftLastEntry.next;
      leftLastEntry.next = undefined;
      let newChildNode = new BPlusTreeNode(rightFirstEntry.isLeaf);
      newChildNode.entry.next = rightFirstEntry.isLeaf
        ? rightFirstEntry
        : rightFirstEntry.next;
      originalNode.next = newChildNode;

      if (parents.size() === 0) {
        let newParentNode = new BPlusTreeNode(false);
        newParentNode.entry.addToNext(rightFirstEntry.value);

        newParentNode.entry.child = originalNode;
        newParentNode.entry.childCount = this.order;

        newParentNode.entry.next.child = newChildNode;
        newParentNode.entry.next.childCount = this.order + 1;

        currentParent.child = newParentNode;
        currentParent.childCount = 1;
        break;
      } else {
        let newParentEntry = currentParent.addToNext(rightFirstEntry.value);
        currentParent.childCount = this.order;
        newParentEntry.child = newChildNode;
        newParentEntry.childCount = this.order + 1;
        parents.peek().childCount++;
      }
    }
  };
}
