import { BLUE, GREY, RED } from "../../util/colors";
import { waitNFrame } from "../../util/waitNFrame";

export function * solveEditDistance(grid, fromCharArray, toCharArray, waitFrame) {
  const canContinue = waitNFrame(waitFrame);
  if (grid === undefined || grid[0] === undefined) {
    return;
  }

  if (grid.length !== toCharArray.length || grid[0].length !== fromCharArray.length) {
    return;
  }

  const n = grid.length;
  const m = grid[0].length;
  const prev = Array.from(Array(n), () => new Array(m));

  for (let i = 0;i < m;i++) {
    grid[0][i].value = i;
    if (i > 0) {
      prev[0][i] = prev[0][i-1];
    }
    prev[0][i]

    grid[0][i].changeColor(RED);
    while (canContinue.next().value === false) {
      yield;
    }
    grid[0][i].changeColor(GREY);
  }

  for (let i = 0;i < n;i++) {
    grid[i][0].value = i;
    if (i > 0) {
      prev[i][0] = prev[i-1][0];
    }

    grid[i][0].changeColor(RED);
    while (canContinue.next().value === false) {
      yield;
    }
    grid[i][0].changeColor(GREY);
  }

  for (let i = 1;i < n;i++) {
    for (let j = 1;j < m;j++) {
      grid[i][j].changeColor(RED);
      while (canContinue.next().value === false) {
        yield;
      }
      if (fromCharArray[j] === toCharArray[i]) {
        grid[i][j].value = grid[i - 1][j - 1].value;
        prev[i][j] = [i - 1, j - 1];

        grid[i - 1][j -1].changeColor(BLUE);
        while (canContinue.next().value === false) {
          yield;
        }
        grid[i - 1][j -1].changeColor(GREY);

      } else {
        let minPrev = Math.min(grid[i - 1][j - 1].value, Math.min(grid[i - 1][j].value, grid[i][j - 1].value));
        if (minPrev === grid[i - 1][j - 1].value) {
          prev[i][j] = [i - 1, j - 1];
          grid[i - 1][j - 1].changeColor(BLUE);
          while (canContinue.next().value === false) {
            yield;
          }
          grid[i - 1][j - 1].changeColor(GREY);
        } else if (minPrev === grid[i - 1][j].value) {
          prev[i][j] = [i - 1, j];
          grid[i - 1][j].changeColor(BLUE);
          while (canContinue.next().value === false) {
            yield;
          }
          grid[i - 1][j].changeColor(GREY);
        } else {
          prev[i][j] = [i, j - 1];
          grid[i][j - 1].changeColor(BLUE);
          while (canContinue.next().value === false) {
            yield;
          }
          grid[i][j - 1].changeColor(GREY);
        }
        grid[i][j].value = minPrev + 1;
      }

      grid[i][j].changeColor(GREY);
    }
  }

  let i = n-1;
  let j = m-1;
  let res = [];
  let edit = [...fromCharArray];
  res.push(edit.join(''));

  while (prev[i][j] !== undefined) {
    grid[i][j].changeColor(RED);
    let prevCoord = prev[i][j];
    if (prevCoord[0] === i-1 && prevCoord[1] === j-1) {
      if (edit[j] !== toCharArray[i]) {
        edit[j] = toCharArray[i];
        res.push(edit.join(''));
      }
    } else if (prevCoord[0] === i-1) {
      edit[i] = toCharArray[i];
      res.push(edit.join(''));
    } else {
      edit[j] = '';
      res.push(edit.join(''));
    }
    i = prevCoord[0];
    j = prevCoord[1];

  }

  return res;
}