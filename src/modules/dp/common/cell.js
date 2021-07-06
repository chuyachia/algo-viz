import { GREY } from "../../util/colors";

export function Cell(x, y, value) {
  /**
   * @type {number}
   */
  this.value = value;
  /**
   * @type {number} Cell's x coordinate on a grid
   */
  this.x = x;
  /**
   * @type {number} Cell's y coordinate on a grid
   */
  this.y = y;
  /**
   * @type {Cell} Previous cell. For backtracking solution
   */
  this.prev;

  let r = GREY.r;
  let g = GREY.g;
  let b = GREY.b;

  this.display = function (p, width, height, xCoord, yCoord) {
    p.push();
    p.fill(r, g, b);
    p.stroke(r, g, b);
    p.rect(xCoord, yCoord, width, height);
    p.fill(0, 0, 0);
    p.text(this.value, xCoord + width / 2, yCoord + height / 2);
    p.pop();
  };

  this.changeColor = function (colorObject) {
    r = colorObject.r;
    g = colorObject.g;
    b = colorObject.b;
  };
}
