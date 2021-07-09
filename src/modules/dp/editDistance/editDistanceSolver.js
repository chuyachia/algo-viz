import { BLUE, GREY, RED } from "../../util/colors";
import { waitNFrame } from "../../util/waitNFrame";
import { Cell } from "../common/cell";
import { Grid } from "../common/grid";

export function editDistance(from, to) {
  let fromCharArray = from.split("");
  fromCharArray.unshift("");
  let toCharArray = to.split("");
  toCharArray.unshift("");
  let gridElement = new Grid(10, 80);
  gridElement.setColumnHeader(fromCharArray);
  gridElement.setRowHeader(toCharArray);
  gridElement.buildGrid();

  let solver = solveEditDistance(
    gridElement.grid,
    fromCharArray,
    toCharArray,
    0
  );
  let res;
  {
    res = solver.next();
  }
  while (!res.done);

  return res.value.length - 1;
}

/**
 *
 * @param {Cell[][]} grid
 * @param {string} fromCharArray
 * @param {string} toCharArray
 * @param {number} waitFrame
 * @returns
 */
export function* solveEditDistance(
  grid,
  fromCharArray,
  toCharArray,
  waitFrame
) {
  const canContinue = waitNFrame(waitFrame);
  if (grid === undefined || grid[0] === undefined) {
    throw "grid must be 2D array";
  }
  const n = grid.length;
  const m = grid[0].length;

  if (m != fromCharArray.length || n != toCharArray.length) {
    throw "grid must be m * n, where m = fromCharArray.length and n = toCharArray.length";
  }

  for (let i = 0; i < m; i++) {
    grid[0][i].value = i;
    if (i > 0) {
      grid[0][i].prev = grid[0][i - 1];
    }

    grid[0][i].changeColor(RED);
    while (canContinue.next().value === false) {
      yield;
    }
    grid[0][i].changeColor(GREY);
  }

  for (let i = 0; i < n; i++) {
    grid[i][0].value = i;
    if (i > 0) {
      grid[i][0].prev = grid[i - 1][0];
    }

    grid[i][0].changeColor(RED);
    while (canContinue.next().value === false) {
      yield;
    }
    grid[i][0].changeColor(GREY);
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      grid[i][j].changeColor(RED);
      while (canContinue.next().value === false) {
        yield;
      }

      let fromCell;

      if (fromCharArray[j] === toCharArray[i]) {
        // character matches, no edit required
        fromCell = grid[i - 1][j - 1];
        grid[i][j].value = fromCell.value;
      } else {
        // 3 possible edits
        // remove
        let e1 = grid[i][j - 1].value + 1;
        // add
        let e2 = grid[i - 1][j].value + 1;
        // replace
        let e3 = grid[i - 1][j - 1].value + 1;
        let minEdit = Math.min(e1, e2, e3);
        grid[i][j].value = minEdit;

        switch (minEdit) {
          case e1:
            fromCell = grid[i][j - 1];
            break;
          case e2:
            fromCell = grid[i - 1][j];
            break;
          case e3:
            fromCell = grid[i - 1][j - 1];
            break;
          default:
            break;
        }
      }

      grid[i][j].prev = fromCell;

      fromCell.changeColor(BLUE);
      while (canContinue.next().value === false) {
        yield;
      }
      fromCell.changeColor(GREY);
      grid[i][j].changeColor(GREY);
    }
  }

  let steps = [];
  let backTrackCell = grid[n - 1][m - 1];

  while (backTrackCell.prev !== undefined) {
    backTrackCell.changeColor(RED);
    steps.unshift([backTrackCell.x - 1, backTrackCell.y - 1]);
    backTrackCell = backTrackCell.prev;
  }

  // Reconstruct result string at each edit
  let unchangedChars = [...fromCharArray];
  unchangedChars.splice(0, 1);
  let changedChars = [];
  let stepStrings = [];
  stepStrings.push(unchangedChars.join(""));
  let i = 0;
  let j = 0;
  for (let s of steps) {
    let ni = s[1];
    let nj = s[0];

    // No edit needed
    if (grid[ni][nj].value == grid[i][j].value) {
      changedChars.push(unchangedChars.splice(0, 1));
      i = ni;
      j = nj;
      continue;
    }

    if (ni === i + 1 && nj === j + 1) {
      // replace
      unchangedChars.splice(0, 1);
      changedChars.push(toCharArray[ni]);
    } else if (ni === i + 1) {
      // add
      changedChars.push(toCharArray[ni]);
    } else {
      // remove
      unchangedChars.splice(0, 1);
    }

    stepStrings.push(changedChars.join("") + unchangedChars.join(""));
    i = ni;
    j = nj;
  }

  return stepStrings;
}
