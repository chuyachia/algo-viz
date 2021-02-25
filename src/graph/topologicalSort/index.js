import { Vertex } from '../common/vertex';
import { topologicalSort } from './topologicalSort';

export function topologicalSortSketch(p) {
  const canvasWidth = 550;
  const canvasHeight = 550;
  var n = 20;
  var vertices = [];
  var radius = 200;
  var from;
  var vertexDiameter = 30;
  var button;
  var mode = 0;
  var topoSortSolver;
  let topoOrdering = [];

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
    if (value == undefined) {
      return 'NA';
    }
    if (value == 1) {
      return value+ 'st';
    } else if (value == 2) {
      return value+ 'nd';
    } else if (value == 3) {
      return value+'rd';
    } else {
      return value+'th';
    }
  }

  p.draw = function() {
    p.background(255, 255, 255);

    showInstructions();

    if (mode == 0) {
      drawNewEdge();
    } else if (mode == 1) {
      let state = topoSortSolver.next();
      if (state.done) {
        mode = 2;
      } else{
        topoOrdering = state.value;
      }
    }

    for (const v of vertices) {
      v.display();
    }
  }

  function showInstructions() {
    switch (mode) {
      case 0:
        p.text('Click on nodes to add link.\n' +
          'Once the graph is done, click on the button to find topological ordering of the nodes', 10, 10);
        button.html('Find topological ordering');
        button.show();
        button.mousePressed(function () {
          mode = 1;
          topoSortSolver = topologicalSort(vertices);
        });
        break;
      case 1:
        p.text('Finding topological ordering', 10, 10);
        button.hide();
        break;
      case 2:
        if (topoOrdering.length == 0) {
          p.text('Graph contains cycle. Topological ordering does not exist', 10, 10);
        } else {
          p.text('Topological ordering found', 10, 10);
        }
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
    topoSortSolver = undefined;
    mode = 0;
    drawGraph();
  }

  function drawNewEdge() {
    if (from == null) {
      return;
    }

    p.push();
    p.stroke(154, 160, 167);
    p.line(from.x, from.y, p.mouseX, p.mouseY);
    p.pop();
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
      from.addEdge(v, 1);
      from = null;
    }
  }

}