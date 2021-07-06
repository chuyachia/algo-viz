export function LinkedList() {
  let head;
  let tail;
  let size = 0;

  this.addFirst = function (element) {
    let obj = { value: element };
    obj.next = head;
    head = obj;
    size++;
  };

  this.add = function (element) {
    let obj = { value: element };
    if (head == null) {
      head = obj;
    }
    if (tail == null) {
      tail = obj;
    } else {
      tail.next = obj;
      tail = tail.next;
    }
    size++;
  };

  this.peek = function () {
    return head != undefined ? head.value : undefined;
  };

  this.poll = function () {
    const res = head;
    head = head.next;
    size--;
    return res.value;
  };

  this.size = function () {
    return size;
  };
}
