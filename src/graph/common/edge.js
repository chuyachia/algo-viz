export function Edge(weight, from, to, vertexDiameter, p) {
  this.colors = {
    SELECTED: {
      r: 254,
      g: 160,
      b: 144,
    },
    DEFAULT: {
      r: 154,
      g: 160,
      b: 167,
    }
  }
  this.weight = weight;
  this.from = from;
  this.to = to;
  this.d = vertexDiameter;
  this.r = this.colors.DEFAULT.r;
  this.b = this.colors.DEFAULT.b;
  this.g = this.colors.DEFAULT.g;
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
    this.p.triangle(0, this.d / 2, this.d/ 4, this.d, -this.d/4, this.d);
    this.p.pop();
  }

  this.changeColor = function(colorObject) {
    this.r = colorObject.r;
    this.g = colorObject.g;
    this.b = colorObject.b;
  }
}