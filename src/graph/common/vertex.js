import { GREY } from '../../util/colors';
import { Edge } from './edge';

export function Vertex(id, x, y, diameter, p, getDisplayValue) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.d = diameter;
  this.r = GREY.r;
  this.b = GREY.b;
  this.g = GREY.g;
  this.edges = {};
  this.p = p;
  this.getDisplayValue = getDisplayValue;
  this.value;

  this.display = function() {
    this.p.push();
    this.p.strokeWeight(0);
    this.p.fill(this.p.color(this.r, this.b, this.g));
    this.p.circle(this.x, this.y, this.d);
    this.p.fill(this.p.color(0,0,0));
    this.p.textAlign(this.p.CENTER);
    let displayValue = this.getDisplayValue? this.getDisplayValue(this.value) : this.value;
    this.p.text(this.id + " : " + displayValue, this.x, this.y + this.d);
    this.p.pop();
    for (const [_, edge] of Object.entries(this.edges)) {
      edge.display();
    }
  }
  
  this.changeColor = function(colorObject) {
    this.r = colorObject.r;
    this.g = colorObject.g;
    this.b = colorObject.b;
  }

  this.addEdge = function(vertex, weight) {
    if (vertex.id != this.id) {
      this.edges[vertex.id] = new Edge(weight, this, vertex, this.d, this.p);
    }
  }
}