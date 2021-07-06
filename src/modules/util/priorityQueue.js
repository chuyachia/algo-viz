export function PriorityQueue(comparator) {
  let keyValueMap = {};
  let keyPositionMap = {};
  let positionKeyMap = [];
  let size = 0;

  this.peek = function () {
    if (size <= 0) {
      throw new Error("Queue is empty");
    }

    return keyValueMap[positionKeyMap[0]];
  };

  this.poll = function () {
    if (size <= 0) {
      throw new Error("Queue is empty");
    }

    let headKey = positionKeyMap[0];
    let rtn = keyValueMap[headKey];
    this.remove(headKey);
    return rtn;
  };

  this.add = function (key, value) {
    if (this.contains(key)) {
      throw new Error("Key already exists");
    }
    keyValueMap[key] = value;
    keyPositionMap[key] = size;
    positionKeyMap[size] = key;
    size++;
    bubbleUp(key);
  };

  this.remove = function (key) {
    if (!this.contains(key)) {
      throw new Error("Key does not exist");
    }
    let tailKey = positionKeyMap[size - 1];
    swapKeyPositions(key, tailKey);
    delete keyValueMap[key];
    keyPositionMap[key] = undefined;
    positionKeyMap[size - 1] = undefined;
    size--;
    bubbleUp(tailKey);
    bubbleDown(tailKey);
  };

  this.update = function (key, value) {
    if (!this.contains(key)) {
      throw new Error("Key does not exist");
    }
    keyValueMap[key] = value;
    bubbleUp(key);
    bubbleDown(key);
  };

  this.contains = function (key) {
    return keyPositionMap[key] !== undefined;
  };

  this.get = function (key) {
    return keyValueMap[key];
  };

  this.size = function () {
    return size;
  };

  function bubbleUp(key) {
    let parent = getParentKey(key);
    while (
      parent !== undefined &&
      comparator(keyValueMap[key], keyValueMap[parent]) < 0
    ) {
      swapKeyPositions(key, parent);
      parent = getParentKey(key);
    }
  }

  function bubbleDown(key) {
    let leftChild = getLeftChildKey(key);
    let rightChild = getRightChildKey(key);

    while (leftChild !== undefined) {
      let smallerChild = leftChild;
      if (
        rightChild !== undefined &&
        comparator(keyValueMap[leftChild], keyValueMap[rightChild]) > 0
      ) {
        smallerChild = rightChild;
      }

      if (comparator(keyValueMap[key], keyValueMap[smallerChild]) < 0) {
        break;
      }

      swapKeyPositions(key, smallerChild);

      leftChild = getLeftChildKey(key);
      rightChild = getRightChildKey(key);
    }
  }

  function swapKeyPositions(keyI, keyJ) {
    var posI = keyPositionMap[keyI];
    var posJ = keyPositionMap[keyJ];
    positionKeyMap[posI] = keyJ;
    positionKeyMap[posJ] = keyI;
    keyPositionMap[keyI] = posJ;
    keyPositionMap[keyJ] = posI;
  }

  function getLeftChildPosition(i) {
    return 2 * i + 1;
  }

  function getLeftChildKey(key) {
    var currentPosition = keyPositionMap[key];
    var lcPosition = getLeftChildPosition(currentPosition);
    return lcPosition < size && lcPosition >= 0
      ? positionKeyMap[lcPosition]
      : undefined;
  }

  function getRightChildPosition(i) {
    return 2 * i + 2;
  }

  function getRightChildKey(key) {
    var currentPosition = keyPositionMap[key];
    var rcPosition = getRightChildPosition(currentPosition);
    return rcPosition < size && rcPosition >= 0
      ? positionKeyMap[rcPosition]
      : undefined;
  }

  function getParentPosition(i) {
    return i % 2 == 0 ? (i - 2) / 2 : (i - 1) / 2;
  }

  function getParentKey(key) {
    var currentPosition = keyPositionMap[key];
    var parentPosition = getParentPosition(currentPosition);
    return parentPosition < size && parentPosition >= 0
      ? positionKeyMap[parentPosition]
      : undefined;
  }
}
