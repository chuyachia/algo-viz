import { BPlusTree } from "./bPlusTree";

export function sketch(p) {
  const canvasWidth = 700;
  const canvasHeight = 550;
  let bPlusTree;
  let inputField;
  let radio;
  let resetButton;

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    inputField = p.createInput("");
    inputField.attribute("placeholder", "Enter number");
    inputField.position(10, 40);
    inputField.elt.addEventListener("keypress", insert);
    resetButton = p.createButton("Reset");
    resetButton.position(10, 40 + inputField.height + 10);
    resetButton.mousePressed(resetTree);
    radio = p.createRadio();
    radio.elt.addEventListener("click", function (e) {
      if (e.target.nodeName === "INPUT") {
        resetTree();
      }
    });
    radio.position(10, 40 + inputField.height + resetButton.height + 10);
    radio.option(1, "Order 1");
    radio.option(2, "Order 2");
    radio.option(3, "Order 3");
    radio.child()[0].setAttribute("checked", "");
    resetTree();
  };

  p.draw = function () {
    p.background(255, 255, 255);
    p.text("Enter a number to insert a new node", 10, 10);
    if (
      bPlusTree !== undefined &&
      bPlusTree.root.entryHead.child !== undefined
    ) {
      bPlusTree.root.entryHead.child.display(p, 0, canvasWidth, 100, 20, 20);
    }
  };

  function insert(e) {
    if (e.keyCode !== p.ENTER) return;

    const num = parseInt(inputField.value());
    inputField.value("");
    if (Number.isNaN(num)) return;

    bPlusTree.insert(num);
  }

  function resetTree() {
    const num = parseInt(radio.value());

    bPlusTree = Number.isNaN(num) ? new BPlusTree(1) : new BPlusTree(num);
  }
}

export const explainText = "<p><strong>B plus tree</strong></p>";
