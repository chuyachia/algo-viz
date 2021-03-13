import { PriorityQueue }  from '../priorityQueue';

const pq = new PriorityQueue((a, b) => a - b);

test('add item increase size', () => {
  pq.add('a', 2);
  pq.add('c', 3);
  pq.add('b', 1);

  expect(pq.size()).toBe(3);
});

test('peek returns min item', () => {
  expect(pq.peek()).toBe(1);
});

test('poll returns min item and remove from queue', () => {
  expect(pq.poll()).toBe(1);
  expect(pq.size()).toBe(2);
  expect(pq.peek()).toBe(2);
});

test('update value reorder queue', () => {
  pq.update('a', 4);
  expect(pq.peek()).toBe(3);
});


test('get returns expected values', () => {
  expect(pq.get('a')).toBe(4);
  expect(pq.get('c')).toBe(3);
});

test('remove decrease queue size', () => {
  pq.remove('a');
  expect(pq.size()).toBe(1);
  expect(pq.get('c')).toBe(3);
  expect(pq.get('a')).toBe(undefined);
  expect(pq.peek()).toBe(3);
});


test('poll alawys returns the min element', () => {
  pq.add('a', 5);
  pq.add('b', 4);
  pq.add('d', 6);
  pq.add('e', 1);
  expect(pq.size()).toBe(5);
  expect(pq.poll()).toBe(1);
  expect(pq.poll()).toBe(3);
  expect(pq.poll()).toBe(4);
  expect(pq.poll()).toBe(5);
  expect(pq.poll()).toBe(6);
});