import { drawVertices, getClosestVertex } from '../common/graph';
import { GrowingEdge } from '../common/growingEdge';
import { dijkstraSolver } from './dijkstra';

export function dijkstraSketch(p) {
  const canvasWidth = 550;
  const canvasHeight = 550;
  const radius = 200;
  const vertexDiameter = 30;

  let n = 20;
  let vertices = [];
  let button;
  let mode = 0;
  let startVertex;
  let dSolver;
  let pendingEdge;
  let pendingEdgeFrom;

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    drawButton();
    vertices = drawVertices(p, n, canvasWidth, canvasHeight, radius, vertexDiameter, 'Inf');
  }

  function drawButton() {
    button = p.createButton('');
    button.position(10, 40);
  }

  p.draw = function () {
    p.background(255, 255, 255);
    showInstructions();

    if (mode === 0) {
      if (pendingEdge !== undefined) {
        if (p.mouseIsPressed) {
          pendingEdge.increaseWeight();
        }
        pendingEdge.display();
      }
    } else if (mode === 2) {
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
    vertices = drawVertices(p, n, canvasWidth, canvasHeight, radius, vertexDiameter, '?');
  }

  p.mouseClicked = function () {
    if (mode != 1) {
      return;
    }

    startVertex = getClosestVertex(p, vertices);
    
    if (startVertex !== undefined) {
      dSolver = dijkstraSolver(startVertex, n);
      mode = 2;
    }
  }

  p.mouseReleased = function () {
    if (mode > 0) {
      return;
    }

    const currentVertex = getClosestVertex(p, vertices);

    if (currentVertex === undefined) {
      return;
    }
    
    if (pendingEdgeFrom === undefined) {
      pendingEdgeFrom  = currentVertex;
      pendingEdge = new GrowingEdge(pendingEdgeFrom.x, pendingEdgeFrom.y, p);
    } else {
      let roundedWeight = Math.round(pendingEdge.weight * 1000) / 1000
      pendingEdgeFrom.addEdge(currentVertex, roundedWeight);
      pendingEdgeFrom = undefined;
      pendingEdge = undefined;
    }
  }
}