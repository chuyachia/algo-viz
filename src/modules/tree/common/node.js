import { GREY } from '../../util/colors';

export function Node(value, diameter, p) {
  this.value = value;
  this.leftChild;
  this.rightChild;
  this.leftChildEdge;
  this.rightChildEdge;
  this.strokeWeight = 0;
  this.height = 0;
  this.balanceFactor = 0;
  this.showLeftRotationArrow = false;
  this.showRightRotationArrow = false;

  this.index;
  this.x;
  this.y;

  let r = GREY.r;
  let g = GREY.g;
  let b = GREY.b;

  this.display = function() {
    if (this.x === undefined || this.y === undefined) {
      return;
    }

    p.push();
    p.stroke(r, g, b);
    p.strokeWeight(this.strokeWeight);
    p.fill(r,g, b);
    p.circle(this.x, this.y, diameter);
    p.fill(0,0,0);
    p.textAlign(p.CENTER);
    p.text(this.value , this.x, this.y);
    p.pop();
    if (this.showRightRotationArrow) {
      this.rightArrow();
    }
    if (this.showLeftRotationArrow) {
      this.leftArrow();
    }
  }

  this.removeArrow = function() {
    this.showLeftRotationArrow = false;
    this.showRightRotationArrow = false;
  }

   this.rightArrow = function() {
    let arcDiameter = diameter + 15;
    p.push();
    p.noFill();
    p.stroke(GREY.r, GREY.g, GREY.b);
    p.arc(this.x, this.y, arcDiameter, arcDiameter, p.PI, p.TWO_PI);
    let triangleCenter = this.x + arcDiameter/2;
    p.triangle(triangleCenter, this.y + 10, triangleCenter-5, this.y, triangleCenter+5, this.y);
    p.pop();
  }

  this.leftArrow = function() {
    let arcDiameter = diameter + 15;
    p.push();
    p.noFill();
    p.stroke(GREY.r, GREY.g, GREY.b);
    p.arc(this.x, this.y, arcDiameter, arcDiameter, p.PI, p.TWO_PI);
    let triangleCenter = this.x - arcDiameter/2;
    p.triangle(triangleCenter, this.y + 10, triangleCenter-5, this.y, triangleCenter+5, this.y);
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