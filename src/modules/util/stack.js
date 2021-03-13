import { LinkedList } from "./linkedList";

export function Stack() {
  let linkedList = new LinkedList();

  this.push = function(value) {
    linkedList.addFirst(value);
  }

  this.pop = function() {
    return linkedList.poll();
  }

  this.peek = function() {
    return linkedList.peek();
  }

  this.size = function() {
    return linkedList.size();
  }
}
