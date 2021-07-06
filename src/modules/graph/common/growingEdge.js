import { GREY } from "../../util/colors";

export function GrowingEdge(fromX, fromY) {
  this.weight = 1;

  this.increaseWeight = function () {
    this.weight += 1 / p.deltaTime;
    this.weight = this.weight % 10;
  };

  this.display = function (p) {
    p.push();
    p.stroke(GREY.r, GREY.g, GREY.b);
    p.strokeWeight(this.weight);
    p.line(fromX, fromY, p.mouseX, p.mouseY);
    p.pop();
  };
}
