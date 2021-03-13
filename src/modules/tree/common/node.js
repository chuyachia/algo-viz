import { GREY } from '../../util/colors';

export function Node(value, diameter, p) {
  this.value = value;
  this.leftChild;
  this.rightChild;
  this.leftChildEdge;
  this.rightChildEdge;
  this.strokeWeight = 0;

  this.index;
  this.x;
  this.y;

  let r = GREY.r;
  let b = GREY.b;
  let g = GREY.g;

  this.display = function() {
    if (this.x === undefined || this.y === undefined) {
      return;
    }

    p.push();
    p.stroke(r, b, g, 80);
    p.strokeWeight(this.strokeWeight);
    p.fill(r, b, g);
    p.circle(this.x, this.y, diameter);
    p.fill(0,0,0);
    p.textAlign(p.CENTER);
    p.text(this.value , this.x, this.y);
    p.pop();
  }

  this.changeColor = function(colorObject) {
    r = colorObject.r;
    g = colorObject.g;
    b = colorObject.b;
  }

  this.getColor = function() {
    return {
      r, g, b
    };
  }

}