import { GREY } from "../../util/colors";
import { Stack } from "../../util/stack";

function BPlusTreeNode(isLeaf) {
  this.isLeaf = isLeaf;
  /**
   * @type {BPlusTreeNode}
   */
  this.next;

  this.entryHead = new BPlusTreeEntry(undefined, undefined, isLeaf, this);
  /**
   * @type {BPlusTreeEntry[]}
   */
  this.entry = [];

  this.display = function (p, xStart, xEnd, y, entryWidth, entryHeight) {
    let entryXStart = this.getEntryStartX(
      xStart,
      xEnd,
      this.entry.length,
      entryWidth
    );
    let childXStart = xStart;
    const childSpaceBetween = (xEnd - xStart) / (this.entry.length + 1);
    let lastChildEntryXEnd;

    if (this.entryHead.child !== undefined) {
      lastChildEntryXEnd = this.displayChild(
        p,
        this.entryHead.child,
        entryXStart,
        y,
        childXStart,
        childXStart + childSpaceBetween,
        y + entryHeight * 2,
        entryWidth,
        entryHeight
      );
      childXStart += childSpaceBetween;
    }

    for (const current of this.entry) {
      if (current.key !== undefined) {
        current.display(p, entryWidth, entryHeight, entryXStart, y);
        entryXStart += entryWidth;
      }

      if (current.child !== undefined) {
        const childXEnd = childXStart + childSpaceBetween;
        const childY = y + entryHeight * 2;
        if (current.child.isLeaf) {
          let childEntryXStart = this.getEntryStartX(
            childXStart,
            childXEnd,
            current.child.entry.length,
            entryWidth
          );
          p.push();
          p.stroke(GREY.r, GREY.g, GREY.b);
          p.line(
            lastChildEntryXEnd,
            childY + entryHeight / 2,
            childEntryXStart,
            childY + entryHeight / 2
          );
          p.pop();
        }

        lastChildEntryXEnd = this.displayChild(
          p,
          current.child,
          entryXStart,
          y,
          childXStart,
          childXEnd,
          childY,
          entryWidth,
          entryHeight
        );
      }

      childXStart += childSpaceBetween;
    }

    return entryXStart;
  };

  this.displayChild = function (
    p,
    node,
    parentX,
    parentY,
    childXStart,
    childXEnd,
    childY,
    entryWidth,
    entryHeight
  ) {
    p.line(
      parentX,
      parentY + entryHeight / 2,
      (childXStart + childXEnd) / 2,
      childY
    );

    return node.display(
      p,
      childXStart,
      childXEnd,
      childY,
      entryWidth,
      entryHeight
    );
  };

  this.replaceEntry = function (entry) {
    this.entry = entry;
    for (const e of entry) {
      e.node = this;
    }
  };

  this.insertNewEntry = function (key, value) {
    let newEntry = new BPlusTreeEntry(key, value, this.isLeaf, this);
    let index = this.findIndexByKey(key, false);
    this.entry.splice(index, 0, newEntry);

    return newEntry;
  };

  this.findIndexByKey = function (key, first) {
    let start = 0;
    let end = this.entry.length;
    const moveStartCondition = first ? (val) => val < key : (val) => val <= key;

    while (start < end) {
      let mid = start + Math.floor((end - start) / 2);
      if (moveStartCondition(this.entry[mid].key)) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }

    return start;
  };

  this.findEntryByKey = function (key) {
    let index = this.findIndexByKey(key, true);
    if (this.entry[index] !== undefined && this.entry[index].key === key)
      return this.entry[index];

    return index > 0 ? this.entry[index - 1] : this.entryHead;
  };

  this.findNthEntry = function (n) {
    return this.entry[n];
  };

  this.getEntryStartX = function (xStart, xEnd, entryCount, entryWidth) {
    return (xStart + xEnd) / 2 - (entryCount * entryWidth) / 2;
  };
}

function BPlusTreeEntry(key, value, isLeaf, node) {
  this.key = key;
  this.value = value;
  this.isLeaf = isLeaf;
  /**
   * @type {BPlusTreeNode}
   */
  this.node = node;
  /**
   * @type {BPlusTreeEntry}
   */
  this.next;
  /**
   * @type {BPlusTreeNode}
   */
  this.child;

  let r = GREY.r;
  let g = GREY.g;
  let b = GREY.b;

  this.changeColor = function (colorObject) {
    r = colorObject.r;
    g = colorObject.g;
    b = colorObject.b;
  };

  this.display = function (p, width, height, xCoord, yCoord) {
    if (this.key === undefined) return;

    p.push();
    p.fill(r, g, b);
    p.rect(xCoord, yCoord, width, height);
    p.fill(0, 0, 0);
    const displayText =
      this.isLeaf && this.value !== undefined
        ? this.key + " : " + this.value
        : this.key;
    p.textAlign(p.LEFT, p.CENTER);
    p.text(displayText, xCoord + 2, yCoord + height / 2);
    p.pop();
  };
}

export function BPlusTree(order) {
  this.root = new BPlusTreeNode(false);
  this.order = order;

  this.get = function (key) {
    let node = this.root;
    while (node !== undefined) {
      let entry = node.findEntryByKey(key);
      if (!entry.isLeaf) {
        node = entry.child;
      } else {
        return entry.key === key ? entry.value : null;
      }
    }

    return null;
  };

  this.insert = function (key, value) {
    const parents = new Stack();

    let node = this.root;
    while (node !== undefined) {
      if (!node.isLeaf) {
        let prevEntry = node.findEntryByKey(key);
        parents.push(prevEntry);
        if (prevEntry.child === undefined) {
          prevEntry.child = new BPlusTreeNode(true);
        }
        node = prevEntry.child;
      } else {
        node.insertNewEntry(key, value);
        node = undefined;
      }
    }

    while (parents.peek().child.entry.length > 2 * this.order) {
      /**
       * @type {BPlusTreeEntry}
       */
      let currentParent = parents.pop();
      let originalNode = currentParent.child;
      let left = originalNode.entry.slice(0, order);
      let right = originalNode.entry.slice(order);
      originalNode.replaceEntry(left);
      let newChildNode = new BPlusTreeNode(originalNode.isLeaf);
      let newParentValue = right[0].key;

      if (originalNode.isLeaf) {
        newChildNode.replaceEntry(right);
        originalNode.next = newChildNode;
      } else {
        newChildNode.entryHead.child = right.shift().child;
        newChildNode.replaceEntry(right);
      }

      if (parents.size() === 0) {
        let newParentNode = new BPlusTreeNode(false);
        newParentNode.insertNewEntry(newParentValue, undefined);
        newParentNode.entryHead.child = originalNode;
        newParentNode.entry[0].child = newChildNode;
        currentParent.child = newParentNode;
        break;
      } else {
        let newParentEntry = currentParent.node.insertNewEntry(
          newParentValue,
          undefined
        );
        newParentEntry.child = newChildNode;
      }
    }
  };
}
