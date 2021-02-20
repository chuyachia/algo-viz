export function Edge(weight, from, to, vertexDiameter, p) {
  this.weight = weight;
  this.from = from;
  this.to = to;
  this.d = vertexDiameter;
  this.r = 0;
  this.b = 0;
  this.g = 0;
  this.p = p;

  this.display = function() {
    var angle = this.p.atan2(this.from.y - this.to.y, this.from.x - this.to.x);
    this.p.push();
    this.p.stroke(this.r, this.g, this.b);
    this.p.strokeWeight(this.weight);
    let l = this.p.line(this.from.x, this.from.y, this.to.x + this.d * this.p.cos(angle), this.to.y + this.d * this.p.sin(angle));
    this.p.pop();

    this.p.push();
    this.p.translate(this.to.x, this.to.y);
    this.p.rotate(angle - this.p.HALF_PI);
    this.p.stroke(this.r, this.g, this.b);
    this.p.fill(this.p.color(255, 255, 255));
    this.p.triangle(0, 10, 5, 20, -5, 20);
    this.p.pop();
  }

  this.changeToRed = function() {
    this.r = 255;
    this.g = 0;
    this.b = 0;
  }

  this.changeToYellow = function() {
    this.r = 255;
    this.g = 255;
    this.b = 0;
  }

  this.changeToBlack = function() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
  }
}