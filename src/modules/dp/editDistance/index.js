import { Grid } from "../common/grid";
import { solveEditDistance } from "./editDistanceSolver";

export function sketch(p) {
  const canvasWidth = 550;
  const canvasHeight = 550;
  let editDistanceSolver;
  let inputElement;
  let button;
  let state = 0;
  let fromCharArray = [];
  let toCharArray = [];
  let gridElement = new Grid(10, 80);
  let res = [];

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    inputElement = p.createInput("");
    inputElement.attribute("placeholder", "Enter string");
    inputElement.attribute("maxLength", "8");
    inputElement.position(10, 40);
    inputElement.elt.addEventListener("keypress", handleEnterKey);
    button = p.createButton("Restart");
    button.position(10, 40);
    button.addClass("action-button");
    button.mousePressed(function () {
      reset();
    });
  };

  function reset() {
    state = 0;
    res = [];
    fromCharArray = [];
    toCharArray = [];
    gridElement = new Grid(10, 80, p);
  }

  p.draw = function () {
    p.background(255, 255, 255);
    switch (state) {
      case 0:
        inputElement.show();
        button.hide();
        p.text("Enter a start string", 10, 10);
        break;
      case 1:
        p.text("Enter a destination string", 10, 10);
        break;
      case 2:
        p.text(
          "Finding minimun edit distance from " +
            fromCharArray.join("") +
            " to " +
            toCharArray.join(""),
          10,
          10
        );
        inputElement.hide();
        let solveResult = editDistanceSolver.next();
        if (solveResult.done) {
          res = solveResult.value;
          state = 3;
        }
        break;
      case 3:
        button.show();
        let dist = res.length - 1;
        p.text("Minimun edit distance: " + dist.toString(), 10, 10);
        p.text(res.join(" > "), 10, 25);
        break;
    }
    gridElement.display(p);
  };

  function handleEnterKey(e) {
    if (e.keyCode === p.ENTER) {
      if (state === 0) {
        fromCharArray = inputElement.value().split("");
        fromCharArray.unshift("");
        inputElement.value("");
        gridElement.setColumnHeader(fromCharArray);
        state = 1;
      } else if (state === 1) {
        toCharArray = inputElement.value().split("");
        toCharArray.unshift("");
        inputElement.value("");
        gridElement.setRowHeader(toCharArray);
        gridElement.buildGrid();
        editDistanceSolver = solveEditDistance(
          gridElement.grid,
          fromCharArray,
          toCharArray,
          30
        );
        state = 2;
      }
    }
  }
}

export const explainText = "";
