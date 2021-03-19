import { BLUE, GREY, RED } from '../../util/colors';
import { drawVertices, getClosestVertex } from '../common/graph';
import { GrowingEdge } from '../common/growingEdge';
import { dijkstraSolver } from './dijkstra';

export function sketch(p) {
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
    button.addClass('action-button');
  }

  p.draw = function () {
    p.background(255, 255, 255);
    showInstructions();
    showLabels();

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
    p.fill(GREY.r, GREY.g, GREY.b);
    p.circle(vertexDiameter, canvasHeight - vertexDiameter, vertexDiameter);
    p.fill(0, 0, 0);
    p.textAlign(p.LEFT);
    p.text("ID : distance", 2 * vertexDiameter, canvasHeight - vertexDiameter);
    p.fill(RED.r, RED.g, RED.b);
    p.circle(vertexDiameter, canvasHeight - 2 * vertexDiameter, vertexDiameter);
    p.text("Visiting", 2 * vertexDiameter, canvasHeight - 2 * vertexDiameter);
    p.fill(BLUE.r, BLUE.g, BLUE.b);
    p.circle(vertexDiameter, canvasHeight - 3 * vertexDiameter, vertexDiameter);
    p.text("Reachable", 2 * vertexDiameter, canvasHeight - 3 * vertexDiameter);
    p.pop();
  }

  function showInstructions() {
    switch (mode) {
      case 0:
        p.text('Click on nodes to add link. Keep mouse pressed to increase link weight.\n' +
          'Once the graph is done, click on the button to find the shortest distance', 10, 10);
        button.html('Find shortest distance');
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
        p.text('Finding shortest distance from node ' + startVertex.id, 10, 10);
        break;
      case 3:
        p.text('Shortest distance from node ' + startVertex.id + ' found', 10, 10);
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
    vertices = drawVertices(p, n, canvasWidth, canvasHeight, radius, vertexDiameter, 'Inf');
  }

  p.mouseClicked = function () {
    if (mode != 1) {
      return;
    }

    startVertex = getClosestVertex(p, vertices);

    if (startVertex !== undefined) {
      dSolver = dijkstraSolver(startVertex, n, 50);
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
      pendingEdgeFrom = currentVertex;
      pendingEdge = new GrowingEdge(pendingEdgeFrom.x, pendingEdgeFrom.y, p);
    } else {
      let roundedWeight = Math.round(pendingEdge.weight * 1000) / 1000
      pendingEdgeFrom.addEdge(currentVertex, roundedWeight);
      pendingEdgeFrom = undefined;
      pendingEdge = undefined;
    }
  }
}

export const explainText = "<p><strong>Dijkstra's algorithm</strong> finds the shortest distance from one node to all other nodes in graphs with non-negative edges. It starts with a node, updates the distance to all its neighbors if the current distance to the neighbor is smaller than previously calculated distance. The current distance from a node to it's neighbor is the sum of the distance to the node and the weight of the edge leading to the neighbor.</p><p>Once all neighbors of a node are visited, the algorithm continues the same procedure with the node that is currently reachable with the shortest distance. Nodes that are already visited will not be revisited. Priority queue (binary heap) can be used to keep track of the reachable nodes and their distances. Head of the queue will have the current reachable node with the shortest distance.</p>";