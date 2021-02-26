import { GREY } from '../../util/colors';
import { Edge } from './edge';

export function Vertex(id, x, y, diameter, p, defaultDisplayValue) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.edges = {};
  this.value;
  this.displayValue = defaultDisplayValue;

  let r = GREY.r;
  let b = GREY.b;
  let g = GREY.g;


  this.display = function() {
    p.push();
    p.strokeWeight(0);
    p.fill(p.color(r, b, g));
    p.circle(this.x, this.y, diameter);
    p.fill(p.color(0,0,0));
    p.textAlign(p.CENTER);
    p.text(this.id + " : " + this.displayValue, this.x, this.y + diameter);
    p.pop();
    for (const [_, edge] of Object.entries(this.edges)) {
      edge.display();
    }
  }
  
  this.changeColor = function(colorObject) {
    r = colorObject.r;
    g = colorObject.g;
    b = colorObject.b;
  }

  this.addEdge = function(vertex, weight) {
    if (vertex.id != this.id) {
      this.edges[vertex.id] = new Edge(weight, this, vertex, diameter, p);
    }
  }
}