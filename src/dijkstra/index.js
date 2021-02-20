import { Vertex } from './vertex';
import { dijkstraSolver } from './dijkstra';

export function sketch(p) {
  var n = 20;
  var vertices = [];
  var radius = 100;
  var from;
  var weight = 1;
  var vertexDiameter = 20;
  var button;
  var mode = 0;
  var startVertex;
  var dSolver;

  p.setup = function () {
    p.createCanvas(400, 400);
    button = p.createButton('');
    drawGraph();
  }

  function drawGraph() {
    let step = p.TWO_PI / n;
    let angle = 0;
    for (let i = 0;i < n;i++) {
      let x = radius * p.cos(angle) + 200;
      let y = radius * p.sin(angle) + 200;
      vertices.push(new Vertex(i, x, y, vertexDiameter, p));
      angle += step;
    }
  }

  p.draw = function () {
    showButton();
    if (mode == 0) {
      drawNewEdge();
    } else if (mode == 1) {
      if (dSolver != null) {
        let state = dSolver.next();
        if (state.done) {
          mode = 2;
        }
      }
    }

    for (const v of vertices) {
      v.display();
    }
  }

  function showButton() {
    switch (mode) {
      case 0:
        button.html('Find shortest path');
        button.mousePressed(function () {
          mode = 1;
        });
        break;
      case 1:
        button.html('Pick a start vertex and begin');
        button.mousePressed(function () {
          if (startVertex != null) {
            dSolver = dijkstraSolver(startVertex, n);
          }
        });
        break;
      case 2:
        button.html('Short paths found. Restart');
        button.mousePressed(function () {
          reset();
        });
        break;
    }
  }

  function reset() {
    vertices = [];
    startVertex = undefined;
    dSolver = undefined;
    mode = 0;
    drawGraph();
  }

  function drawNewEdge() {
    p.background(255, 255, 255);

    if (from != null) {
      if (p.mouseIsPressed) {
        weight += 1 / p.deltaTime
        weight = weight % 10;
      }
      p.push();
      p.strokeWeight(weight);
      p.line(from.x, from.y, p.mouseX, p.mouseY);
      p.pop();
    }
  }

  function chooseStartVertex() {
    for (const v of vertices) {
      if (p.dist(p.mouseX, p.mouseY, v.x, v.y) < 10) {
        v.changeColor(p);
        startVertex = v;
        break;
      }
    }
  }

  p.mouseClicked = function () {
    if (mode == 1 && startVertex == null) {
      chooseStartVertex();
    }
  }

  p.mouseReleased = function () {
    if (mode > 0) {
      return;
    }

    for (const v of vertices) {
      if (p.dist(p.mouseX, p.mouseY, v.x, v.y) < 10) {
        if (from == null) {
          from = v;
        } else {
          weight = Math.round(weight * 1000)/1000
          from.addEdge(v, weight);
          from = null;
          weight = 1;
        }
        break;
      }
    }
  }
}