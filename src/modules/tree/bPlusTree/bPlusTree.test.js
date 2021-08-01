import { BPlusTree } from "./bPlusTree";

test("key insert correctly within one level", () => {
  const b = new BPlusTree(2);
  b.insert(1);
  b.insert(2);
  b.insert(3);
  b.insert(4);
  let parentNode = b.root.entryHead.child;
  expect(parentNode.entry.length).toBe(4);
  expect(parentNode.entry[0].key).toBe(1);
  expect(parentNode.entry[1].key).toBe(2);
  expect(parentNode.entry[2].key).toBe(3);
  expect(parentNode.entry[3].key).toBe(4);
});

test("key insert correctly within one level regardless of insertion order", () => {
  const b = new BPlusTree(2);
  b.insert(1);
  b.insert(4);
  b.insert(3);
  b.insert(2);
  let parentNode = b.root.entryHead.child;
  expect(parentNode.entry.length).toBe(4);
  expect(parentNode.entry[0].key).toBe(1);
  expect(parentNode.entry[1].key).toBe(2);
  expect(parentNode.entry[2].key).toBe(3);
  expect(parentNode.entry[3].key).toBe(4);
});

test("key insert correctly across multiple levels", () => {
  const b = new BPlusTree(2);
  b.insert(1);
  b.insert(2);
  b.insert(3);
  b.insert(4);
  b.insert(5);
  let parentNode = b.root.entryHead.child;
  expect(parentNode.entry.length).toBe(1);
  expect(parentNode.entry[0].key).toBe(3);

  let childNode1 = parentNode.entryHead.child;
  expect(childNode1.entry.length).toBe(2);
  expect(childNode1.entry[0].key).toBe(1);

  let childNode2 = parentNode.entry[0].child;
  expect(childNode2.entry.length).toBe(3);
  expect(childNode2.entry[0].key).toBe(3);
});

test("key insert correctly across multiple levels with different order", () => {
  const b = new BPlusTree(1);
  b.insert(1);
  b.insert(2);
  b.insert(3);
  b.insert(4);
  b.insert(5);

  let parentNode = b.root.entryHead.child;
  expect(parentNode.entry.length).toBe(1);
  expect(parentNode.entry[0].key).toBe(3);

  let childNode1 = parentNode.entryHead.child;
  expect(childNode1.entry.length).toBe(1);
  expect(childNode1.entry[0].key).toBe(2);

  let childNode2 = parentNode.entry[0].child;
  expect(childNode2.entry.length).toBe(1);
  expect(childNode2.entry[0].key).toBe(4);

  let grandChildNode1 = childNode1.entryHead.child;
  expect(grandChildNode1.entry.length).toBe(1);
  expect(grandChildNode1.entry[0].key).toBe(1);

  let grandChildNode2 = childNode1.entry[0].child;
  expect(grandChildNode2.entry.length).toBe(1);
  expect(grandChildNode2.entry[0].key).toBe(2);

  let grandChildNode3 = childNode2.entryHead.child;
  expect(grandChildNode3.entry.length).toBe(1);
  expect(grandChildNode3.entry[0].key).toBe(3);

  let grandChildNode4 = childNode2.entry[0].child;
  expect(grandChildNode4.entry.length).toBe(2);
  expect(grandChildNode4.entry[0].key).toBe(4);
  expect(grandChildNode4.entry[1].key).toBe(5);
});

test("nodes are linked with pointer to next", () => {
  const b = new BPlusTree(1);
  b.insert(1);
  b.insert(2);
  b.insert(3);
  b.insert(4);
  let leafNode = b.root.entryHead.child.entryHead.child;
  expect(leafNode.isLeaf).toBe(true);
  expect(leafNode.entry.length).toBe(1);
  expect(leafNode.entry[0].key).toBe(1);
  expect(leafNode.next.entry.length).toBe(1);
  expect(leafNode.next.entry[0].key).toBe(2);
  expect(leafNode.next.next.entry.length).toBe(2);
  expect(leafNode.next.next.entry[0].key).toBe(3);
  expect(leafNode.next.next.entry[1].key).toBe(4);
});

test("get value correctly within one level", () => {
  const b = new BPlusTree(2);
  b.insert(1, "a");
  b.insert(2, "b");
  b.insert(3, "c");
  b.insert(4, "d");
  expect(b.get(1)).toBe("a");
  expect(b.get(2)).toBe("b");
  expect(b.get(3)).toBe("c");
  expect(b.get(4)).toBe("d");
});

test("get value correctly across multiple levels", () => {
  const b = new BPlusTree(2);
  b.insert(1, "a");
  b.insert(2, "b");
  b.insert(3, "c");
  b.insert(4, "d");
  b.insert(5, "e");
  expect(b.get(1)).toBe("a");
  expect(b.get(2)).toBe("b");
  expect(b.get(3)).toBe("c");
  expect(b.get(4)).toBe("d");
  expect(b.get(5)).toBe("e");
});

test("get value correctly across multiple levels", () => {
  const b = new BPlusTree(1);
  b.insert(1, "a");
  b.insert(4, "b");
  b.insert(2, "c");
  b.insert(5, "d");
  b.insert(3, "e");
  expect(b.get(1)).toBe("a");
  expect(b.get(2)).toBe("c");
  expect(b.get(3)).toBe("e");
  expect(b.get(4)).toBe("b");
  expect(b.get(5)).toBe("d");
});

test("get first value when multiple key exists", () => {
  const b = new BPlusTree(1);
  b.insert(1, "a");
  b.insert(2, "b");
  b.insert(2, "c");
  b.insert(3, "d");
  expect(b.get(1)).toBe("a");
  expect(b.get(2)).toBe("b");
  expect(b.get(3)).toBe("d");
});
