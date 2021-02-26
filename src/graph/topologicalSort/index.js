import { drawVertices, getClosestVertex } from '../common/graph';
import { GrowingEdge } from '../common/growingEdge';
import { topologicalSort } from './topologicalSort';

export function topologicalSortSketch(p) {
  const canvasWidth = 550;
  const canvasHeight = 550;
  const radius = 200;
  const vertexDiameter = 30;
  
  let n = 20;
  let vertices = [];
  let pendingEdge;
  let pendingEdgeFrom;
  let button;
  let mode = 0;
  let topoSortSolver;
  let topoOrdering = [];

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    drawButton();
    vertices = drawVertices(p, n, canvasWidth, canvasHeight, radius, vertexDiameter, '?');
  }

  function drawButton() {
    button = p.createButton('');
    button.position(10, 40);
  }
  
  p.draw = function() {
    p.background(255, 255, 255);
    showInstructions();

    if (mode == 0) {
      if (pendingEdge !== undefined) {
        pendingEdge.display();
      }
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
    vertices = drawVertices(p, n, canvasWidth, canvasHeight, radius, vertexDiameter, '?');
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
      pendingEdgeFrom.addEdge(currentVertex, 1);
      pendingEdgeFrom = undefined;
      pendingEdge = undefined;
    }
  }

}