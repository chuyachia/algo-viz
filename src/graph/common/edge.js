import { GREY } from "../../util/colors";

export function Edge(weight, from, to, vertexDiameter, p, directed) {
  this.weight = weight;
  this.from = from;
  this.to = to;
  
  let r = GREY.r;
  let b = GREY.b;
  let g = GREY.g;

  this.display = function() {
    if (this.from == null || this.to == null) {
      return;
    }

    if (directed) {
      this.drawDirectedEdge();
    } else {
      this.drawUndirectedEdge();
    }
  }

  this.drawUndirectedEdge = function() {
    p.push();
    p.stroke(r, g, b);
    p.strokeWeight(this.weight);
    p.line(this.from.x, this.from.y, this.to.x , this.to.y);
    p.pop(); 
  }

  this.drawDirectedEdge = function() {
    var angle = p.atan2(this.from.y - this.to.y, this.from.x - this.to.x);
    p.push();
    p.stroke(r, g, b);
    p.strokeWeight(this.weight);
    p.line(this.from.x, this.from.y, this.to.x + vertexDiameter * p.cos(angle), this.to.y + vertexDiameter * p.sin(angle));
    p.pop();

    p.push();
    p.translate(this.to.x, this.to.y);
    p.rotate(angle - p.HALF_PI);
    p.stroke(r, g, b);
    p.fill(p.color(255, 255, 255));
    p.triangle(0, vertexDiameter / 2, vertexDiameter / 4, vertexDiameter, -vertexDiameter / 4, vertexDiameter);
    p.pop();
  }

  this.changeColor = function(colorObject) {
    r = colorObject.r;
    g = colorObject.g;
    b = colorObject.b;
  }
}