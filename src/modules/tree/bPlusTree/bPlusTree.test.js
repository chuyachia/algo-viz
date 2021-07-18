import { BPlusTree } from "./bPlusTree";

test("insert correctly within one level", () => {
  const b = new BPlusTree(2);
  b.insert(1);
  b.insert(2);
  b.insert(3);
  b.insert(4);
  let rootEntry = b.root.entry;
  expect(rootEntry.childCount).toBe(4);
  let childEntry = rootEntry.child.entry;
  expect(fetchNNext(1, childEntry).value).toBe(1);
  expect(fetchNNext(2, childEntry).value).toBe(2);
  expect(fetchNNext(3, childEntry).value).toBe(3);
  expect(fetchNNext(4, childEntry).value).toBe(4);
});

test("insert correctly within one level regardless of insertion order", () => {
  const b = new BPlusTree(2);
  b.insert(1);
  b.insert(4);
  b.insert(3);
  b.insert(2);
  let rootEntry = b.root.entry;
  expect(rootEntry.childCount).toBe(4);
  let childEntry = rootEntry.child.entry;
  expect(fetchNNext(1, childEntry).value).toBe(1);
  expect(fetchNNext(2, childEntry).value).toBe(2);
  expect(fetchNNext(3, childEntry).value).toBe(3);
  expect(fetchNNext(4, childEntry).value).toBe(4);
});

test("insert correctly across multiple levels with order 2", () => {
  const b = new BPlusTree(2);
  b.insert(1);
  b.insert(2);
  b.insert(3);
  b.insert(4);
  b.insert(5);
  let rootEntry = b.root.entry;
  expect(rootEntry.childCount).toBe(1);
  let childEntry = rootEntry.child.entry;
  expect(childEntry.childCount).toBe(2);
  expect(fetchNNext(1, childEntry).childCount).toBe(3);
  expect(fetchNNext(1, childEntry).value).toBe(3);
});

test("insert correctly across multiple levels with order 1", () => {
  const b = new BPlusTree(1);
  b.insert(1);
  b.insert(2);
  b.insert(3);
  b.insert(4);
  let rootEntry = b.root.entry;
  expect(rootEntry.childCount).toBe(2);
  let childEntry = rootEntry.child.entry;
  expect(fetchNNext(1, childEntry).value).toBe(2);
  expect(fetchNNext(2, childEntry).value).toBe(3);
  expect(fetchNNext(0, childEntry).childCount).toBe(1);
  expect(fetchNNext(1, fetchNNext(0, childEntry).child.entry).value).toBe(1);
  expect(fetchNNext(1, childEntry).childCount).toBe(1);
  expect(fetchNNext(1, fetchNNext(1, childEntry).child.entry).value).toBe(2);
  expect(fetchNNext(2, childEntry).childCount).toBe(2);
  expect(fetchNNext(1, fetchNNext(2, childEntry).child.entry).value).toBe(3);
  expect(fetchNNext(2, fetchNNext(2, childEntry).child.entry).value).toBe(4);
});

test("tree node are linked with next pointer", () => {
  const b = new BPlusTree(1);
  b.insert(1);
  b.insert(2);
  b.insert(3);
  b.insert(4);
  let leaftNode = b.root.entry.child.entry.child;
  expect(leaftNode.isLeaf).toBe(true);
  expect(fetchNNext(0, leaftNode).entry.next.value).toBe(1);
  expect(fetchNNext(1, leaftNode).entry.next.value).toBe(2);
  expect(fetchNNext(2, leaftNode).entry.next.value).toBe(3);
});

function fetchNNext(n, node) {
  while (n-- > 0) {
    node = node.next;
  }

  return node;
}
