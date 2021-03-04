import { GREY } from '../../util/colors';
import { Edge } from './edge';

export function Vertex(id, x, y, diameter, p, defaultDisplayValue) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.edges = [];
  this.value;
  this.displayValue = defaultDisplayValue;

  let r = GREY.r;
  let b = GREY.b;
  let g = GREY.g;
  let strokeWeight = 0;
  let existingEdges = new Set();

  this.display = function() {
    p.push();
    p.stroke(r, b, g, 80);
    p.strokeWeight(strokeWeight);
    p.fill(r, b, g);
    p.circle(this.x, this.y, diameter);
    p.fill(0,0,0);
    p.strokeWeight(0);
    let displayText = this.displayValue.length > 0?  ' : ' + this.displayValue : '';
    p.textAlign(p.CENTER);
    p.text(this.id + displayText , this.x, this.y + diameter);
    p.pop();
    for (const edge of this.edges) {
      edge.display();
    }
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

  this.changeStrokeWeight = function(sw) {
    strokeWeight = sw;
  }

  this.addEdge = function(vertex, weight) {
    if (vertex.id != this.id && ! existingEdges.has(vertex.id)) {
      existingEdges.add(vertex.id);
      this.edges.push(new Edge(weight, this, vertex, diameter, p, true));
    }
  }
}