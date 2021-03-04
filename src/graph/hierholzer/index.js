import { GREY } from '../../util/colors';
import { drawVertices, getClosestVertex } from '../common/graph';
import { GrowingEdge } from '../common/growingEdge';
import { hierholzer } from './hierholzer';

export function sketch(p) {
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
  let hierholzerSolver;
  let pathExists = false;

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    drawButton();
    vertices = drawVertices(p, n, canvasWidth, canvasHeight, radius, vertexDiameter, '');
  }

  function drawButton() {
    button = p.createButton('');
    button.position(10, 40);
    button.addClass('action-button');
  }

  p.draw = function () {
    p.background(255, 255, 255);
    showInstructions();
    showLabels();

    if (mode == 0) {
      if (pendingEdge !== undefined) {
        pendingEdge.display();
      }
    } else if (mode == 1) {
      let state = hierholzerSolver.next();
      console.log(state);
      if (state.done) {
        mode = 2;
      } else {
        pathExists = state.value;
      }
    }

    for (const v of vertices) {
      v.displayEdges();
    }

    // So that vertex text will show on top of edge arrow
    for (const v of vertices) {
      v.display();
    }
  }

  function showLabels() {
    p.push();
    p.strokeWeight(0);
    p.fill(GREY.r, GREY.b, GREY.g);
    p.circle(vertexDiameter, canvasHeight - vertexDiameter, vertexDiameter);
    p.textAlign(p.LEFT);
    p.fill(0, 0, 0);
    p.text("ID : visit order", 2 * vertexDiameter, canvasHeight - vertexDiameter);
    p.pop();
  }

  function showInstructions() {
    switch (mode) {
      case 0:
        p.text('Click on nodes to add link.\n' +
          'Once the graph is done, click on the button to find Eulerian path', 10, 10);
        button.html('Find Eulerian path');
        button.show();
        button.mousePressed(function () {
          mode = 1;
          hierholzerSolver = hierholzer(vertices);
        });
        break;
      case 1:
        p.text('Finding Eulerian path', 10, 10);
        button.hide();
        break;
      case 2:
        if (pathExists) {
          p.text('Eulerian path found', 10, 10);
        } else {
          p.text('Eulerian path does not exist on graph', 10, 10);
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
    hierholzerSolver = undefined;
    mode = 0;
    vertices = drawVertices(p, n, canvasWidth, canvasHeight, radius, vertexDiameter, '');
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
      pendingEdgeFrom = currentVertex;
      pendingEdge = new GrowingEdge(pendingEdgeFrom.x, pendingEdgeFrom.y, p);
    } else {
      pendingEdgeFrom.addEdge(currentVertex, 1);
      pendingEdgeFrom = undefined;
      pendingEdge = undefined;
    }
  }

}

export const explainText = "<p><strong>Hierholzer's algorithm</strong> finds Eulerian path in a graph. Eulerian path is a route in a graph following which every edge in the graph will be visited exactly once. Eulerian cycle is a Eulerian path whose start node is the same as the end node. When Eulerian cycle exits in a graph, an Eulerian path can be found starting at any node.</p><p>On a directed graph, Eulerian path only exists if at most one node has out degree - in degree = 1 and at most one node has in degree - out degree = 1. If all nodes have the same in degree and out degree, Eulerian cycle exists on the graph.</p><p>After checking the existence of Eulerian path, Hierholzer's algorithm starts at the node whose out degree - in degree = 1, or at any node in case of Eularian cycle. The algorithm tracks the remaining out degree of every node and decrement the remaining out degree of the current node. It then visits the neighbor of the current node in depth first search. When visiting a node with out degree = 0, the algorithm backtracks and add the node to the back of Eulerian path.</p>"