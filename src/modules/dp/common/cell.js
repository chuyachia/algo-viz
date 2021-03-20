import { GREY } from "../../util/colors";

export function Cell(x, y, width, height, value, p) {
  this.value = value;

  let r = GREY.r;
  let g = GREY.g;
  let b = GREY.b;

  this.display = function() {
    p.push();
    p.fill(r,g, b);
    p.stroke(r, g, b);
    p.rect(x, y, width, height);
    p.fill(0,0,0);
    p.text(this.value , x + width/2, y+height/2);
    p.pop();
  }

  this.changeColor = function(colorObject) {
    r = colorObject.r;
    g = colorObject.g;
    b = colorObject.b;
  }
}