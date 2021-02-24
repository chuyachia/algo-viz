import { Edge } from './edge';

export function Vertex(id, x, y, diameter, p, getDisplayValue) {
  this.colors = {
    VISITING: {
      r: 254,
      g: 160,
      b: 144,
    },
    REACHABLE: {
      r: 89,
      g: 199,
      b: 235,
    },
    DEFAULT: {
      r: 154,
      g: 160,
      b: 167,
    }
  }
  this.id = id;
  this.x = x;
  this.y = y;
  this.d = diameter;
  this.r = this.colors.DEFAULT.r;
  this.b = this.colors.DEFAULT.b;
  this.g = this.colors.DEFAULT.g;
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