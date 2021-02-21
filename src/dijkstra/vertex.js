import { Edge } from './edge';

export function Vertex(id, x, y, diameter, p) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.d = diameter;
  this.r = 255;
  this.b = 255;
  this.g = 255;
  this.edges = {};
  this.p = p;

  this.display = function() {
    this.p.fill(this.p.color(this.r, this.b, this.g));
    this.p.circle(this.x, this.y, this.d);
    this.p.fill(this.p.color(0,0,0));
    this.p.textAlign(this.p.CENTER);
    this.p.text(this.id, this.x, this.y);
    for (const [_, edge] of Object.entries(this.edges)) {
      edge.display();
    }
  }
  
  this.changeColor = function() {
    this.r = this.p.random(255);
    this.g = this.p.random(255);
    this.b = this.p.random(255);
  }

  this.addEdge = function(vertex, weight) {
    if (vertex.id != this.id) {
      this.edges[vertex.id] = new Edge(weight, this, vertex, this.d, this.p);
    }
  }
}