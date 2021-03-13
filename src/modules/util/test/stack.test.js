import { Stack } from '../stack';

const stack = new Stack();

test('push add to stack', () =>  {
  stack.push('abc');
  expect(stack.peek()).toBe('abc');
  expect(stack.size()).toBe(1);
});

test('stack works LIFO', () =>  {
  stack.push('def');
  expect(stack.peek()).toBe('def');
  expect(stack.size()).toBe(2);
});

test('pop removes from stack', () =>  {
  expect(stack.pop()).toBe('def');
  expect(stack.size()).toBe(1);
  expect(stack.pop()).toBe('abc');
  expect(stack.size()).toBe(0);
});


