import { Vertex } from '../common/vertex';
import { dijkstraSolver } from './dijkstra';

export function dijkstraSketch(p) {
  const canvasWidth = 550;
  const canvasHeight = 550;
  var n = 20;
  var vertices = [];
  var radius = 200;
  var from;
  var weight = 1;
  var vertexDiameter = 30;
  var button;
  var mode = 0;
  var startVertex;
  var dSolver;

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    drawButton();
    drawGraph();
  }

  function drawButton() {
    button = p.createButton('');
    button.position(10, 40);
  }

  function drawGraph() {
    let step = p.TWO_PI / n;
    let angle = 0;
    for (let i = 0;i < n;i++) {
      let x = radius * p.cos(angle) + canvasWidth/2;
      let y = radius * p.sin(angle) + canvasHeight/2;
      vertices.push(new Vertex(i, x, y, vertexDiameter, p, verteValueDisplay));
      angle += step;
    }
  }


  function verteValueDisplay(value) {
    return value == undefined? 'Inf' : value.toFixed(2);
  }

  p.draw = function () {
    p.background(255, 255, 255);

    showInstructions();

    if (mode == 0) {
      drawNewEdge();
    } else if (mode == 2) {
      let state = dSolver.next();
      if (state.done) {
        mode = 3;
      }
    }

    for (const v of vertices) {
      v.display();
    }
  }

  function showInstructions() {
    switch (mode) {
      case 0:
        p.text('Click on nodes to add link. Keep mouse pressed to increase link weight.\n' +
          'Once the graph is done, click on the button to find shortest paths', 10, 10);
        button.html('Find shortest paths');
        button.show();
        button.mousePressed(function () {
          mode = 1;
        });
        break;
      case 1:
        p.text('Choose a start node to begin', 10, 10);
        button.hide();
        break;
      case 2:
        p.text('Finding shortest paths from node ' +  startVertex.id, 10, 10);
        break;
      case 3:
        p.text('Shortest paths from node '+ startVertex.id +' found', 10, 10);
        button.show();
        button.html('Restart');
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
    if (from == null) {
      return;
    }

    if (p.mouseIsPressed) {
      weight += 1 / p.deltaTime
      weight = weight % 10;
    }
    
    p.push();
    p.stroke(154, 160, 167);
    p.strokeWeight(weight);
    p.line(from.x, from.y, p.mouseX, p.mouseY);
    p.pop();
  }

  function chooseStartVertex() {
    for (const v of vertices) {
      if (p.dist(p.mouseX, p.mouseY, v.x, v.y) < 10) {
        startVertex = v;
        break;
      }
    }
  }

  p.mouseClicked = function () {
    if (mode != 1) {
      return;
    }

    chooseStartVertex();
    if (startVertex != null) {
      dSolver = dijkstraSolver(startVertex, n);
      mode = 2;
    }
  }

  function getClosestVertex() {
    for (const v of vertices) {
      if (p.dist(p.mouseX, p.mouseY, v.x, v.y) < 10) {
        return v;
      }
    }    
  }

  p.mouseReleased = function () {
    if (mode > 0) {
      return;
    }

    const v = getClosestVertex();
    if (v == undefined) {
      return;
    }
    
    if (from == null) {
      from  = v;
    } else {
      weight = Math.round(weight * 1000) / 1000
      from.addEdge(v, weight);
      from = null;
      weight = 1;
    }
  }
}