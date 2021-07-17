import { Cell } from "../dp/common/cell";
import { RED } from "../util/colors";
import { binarySearchSolver } from "./binarySearch";

export function sketch(p) {
  const canvasWidth = 550;
  const canvasHeight = 550;

  const startX = 10;
  const startY = 80;

  const cellWidth = 40;
  const cellHeight = 30;
  const spaceBetween = 10;
  const nPerRow = 10;

  let inputElement;
  let target;
  let animationPlaying = false;
  let animationGenerator;

  /**
   * @type {Cell[]}
   */
  const searchList = [];

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    inputElement = p.createInput("");
    inputElement.attribute("placeholder", "Enter number");
    inputElement.position(startX, 40);
  };

  p.draw = function () {
    p.background(255, 255, 255);
    p.text(
      "Enter a number to search. If the number is found in the list, it will be highlighted. \nElse, it will be inserted at the appropriate place.",
      10,
      10
    );

    if (animationPlaying && animationGenerator !== undefined) {
      const state = animationGenerator.next();
      if (state.done) {
        animationPlaying = false;
        enableInteraction();
        if (state.value < 0) {
          const insertion = -(state.value + 1);
          let newCell = new Cell(0, 0, target);
          newCell.changeColor(RED);
          searchList.splice(insertion, 0, newCell);
        }
      }
    }

    for (const [i, cell] of searchList.entries()) {
      let row = Math.floor(i / nPerRow);
      let col = i % nPerRow;
      cell.display(
        p,
        cellWidth,
        cellHeight,
        startX + col * (cellWidth + spaceBetween),
        startY + row * (cellHeight + spaceBetween)
      );
    }
  };

  p.keyReleased = function () {
    if (p.keyCode === p.ENTER) {
      validateInputAndInsertNode();
    }
  };

  /**
   *
   * @param {Cell} cell
   * @returns
   */
  function getValueFromCell(cell) {
    return cell.value;
  }

  function disableInteraction() {
    inputElement.attribute("disabled", "");
  }

  function enableInteraction() {
    inputElement.removeAttribute("disabled");
  }

  function validateInputAndInsertNode() {
    target = parseInt(inputElement.value());
    inputElement.value("");
    if (!Number.isNaN(target)) {
      animationGenerator = binarySearchSolver(
        searchList,
        target,
        getValueFromCell,
        30
      );
      animationPlaying = true;
      disableInteraction();
    }
  }
}

export const explainText = "<p><strong>Binary search</strong></p>";
