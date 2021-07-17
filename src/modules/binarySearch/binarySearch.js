import { Cell } from "../dp/common/cell";
import { GREY, RED, BLUE } from "../util/colors";
import { waitNFrame } from "../util/waitNFrame";

/**
 * @callback getValueCallback
 * @param {*} anything
 * @returns {number}
 */

/**
 * Returns the index of the found element. If no element found, return -(insertionPosition+1) ;
 * @param {*[]} searchList
 * @param {number} target
 * @param {getValueCallback} function to get number value
 *
 */
export function* binarySearchSolver(searchList, target, getValue, waitFrame) {
  if (typeof getValue !== "function") {
    getValue = (i) => i;
  }

  if (waitFrame === undefined) {
    waitFrame = 0;
  }

  const isCell = searchList[0] instanceof Cell;

  const canContinue = waitNFrame(waitFrame);

  let start = 0;
  let end = searchList.length;

  while (start < end) {
    let mid = start + Math.floor((end - start) / 2);

    if (isCell) {
      for (let i = start; i < end; i++) {
        searchList[i].changeColor(BLUE);
      }
      searchList[mid].changeColor(RED);
      while (canContinue.next().value === false) {
        yield;
      }
    }

    if (getValue(searchList[mid]) < target) {
      if (isCell) {
        for (let i = start; i <= mid; i++) {
          searchList[i].changeColor(GREY);
        }
      }
      start = mid + 1;
    } else if (getValue(searchList[mid]) > target) {
      if (isCell) {
        for (let i = mid; i < end; i++) {
          searchList[i].changeColor(GREY);
        }
      }
      end = mid;
    } else {
      if (isCell) {
        for (let i = start; i < end; i++) {
          searchList[i].changeColor(GREY);
        }
        searchList[mid].changeColor(RED);
      }

      return mid;
    }
  }

  if (searchList[start] === undefined) {
    return -(start + 1);
  }

  if (getValue(searchList[start]) === target) {
    if (isCell) {
      searchList[start].changeColor(RED);
    }
    return start;
  } else {
    return -(start + 1);
  }
}

export function binarySearch(searchList, target) {
  let solver = binarySearchSolver(searchList, target);
  let state;
  {
    state = solver.next();
  }
  while (!state.done);

  return state.value;
}
