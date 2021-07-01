import { GREY } from "../../util/colors";

export function Edge(weight, from, to) {
  this.weight = weight;
  this.from = from;
  this.to = to;
  
  let r = GREY.r;
  let g = GREY.g;
  let b = GREY.b;

  this.display = function(p, vertexDiameter, directed) {
    if (this.from == null || this.to == null) {
      return;
    }

    if (directed) {
      this.drawDirectedEdge(p, vertexDiameter);
    } else {
      this.drawUndirectedEdge(p, vertexDiameter);
    }
  }

  this.drawUndirectedEdge = function(p, vertexDiameter) {
    var angle = p.atan2(this.from.y - this.to.y, this.from.x - this.to.x);
    p.push();
    p.stroke(r, g, b);
    p.strokeWeight(this.weight);
    p.line(this.from.x, this.from.y, this.to.x + vertexDiameter/2 * p.cos(angle), this.to.y + vertexDiameter/2 * p.sin(angle));
    p.pop(); 
  }

  this.drawDirectedEdge = function(p, vertexDiameter) {
    var angle = p.atan2(this.from.y - this.to.y, this.from.x - this.to.x);
    p.push();
    p.stroke(r, g, b);
    p.strokeWeight(this.weight);
    p.line(this.from.x, this.from.y, this.to.x + vertexDiameter * p.cos(angle), this.to.y + vertexDiameter * p.sin(angle));
    p.pop();

    p.push();
    p.stroke(r, g, b);
    p.fill(p.color(255, 255, 255));
    p.translate(this.to.x, this.to.y);
    p.rotate(angle - p.HALF_PI);   
    p.triangle(0, vertexDiameter / 2, vertexDiameter / 4, vertexDiameter, -vertexDiameter / 4, vertexDiameter);
    p.pop();
  }

  this.changeColor = function(colorObject) {
    r = colorObject.r;
    g = colorObject.g;
    b = colorObject.b;
  }
}