import { GREY } from '../../util/colors';
import { drawVertices, getClosestVertex } from '../common/graph';
import { GrowingEdge } from '../common/growingEdge';
import { tarjan } from './tarjan';

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
  let tarjanSolver;

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
    showLabels();

    if (mode == 0) {
      if (pendingEdge !== undefined) {
        pendingEdge.display();
      }
    } else if (mode == 1) {
      let state = tarjanSolver.next();
      if (state.done) {
        mode = 2;
      }
    }

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
    p.text("ID : group", 2 * vertexDiameter, canvasHeight - vertexDiameter);
    p.pop();
  }

  function showInstructions() {
    switch (mode) {
      case 0:
        p.text('Click on nodes to add link.\n' +
          'Once the graph is done, click on the button to find strongly connected components', 10, 10);
        button.html('Find strongly connected components');
        button.show();
        button.mousePressed(function () {
          mode = 1;
          tarjanSolver = tarjan(vertices);
        });
        break;
      case 1:
        p.text('Finding strongly connected components', 10, 10);
        button.hide();
        break;
      case 2:
        p.text('Strongly connected components found', 10, 10);
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
    tarjanSolver = undefined;
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

export const explainText = "<p>Tarjan's algorithm finds strongly connected components in a graph. A strongly connected component is a group of nodes in which every node is reachable by any other node.</p><p>The algorithm starts at a random node and uses depth first search to visit all its neighbors and their neighbors. When visiting a node, a low link value is assigned to the node which represents the lowest node reachable from current node. Low link value is initialized to 0 and increment each time it's assigned to a node.</p><p>When meeting a node already visited during current depth first search, the algorithm backtracks and update the low link value to the lower value between the already visited node and the currently visiting node.</p><p>After visiting all reachable nodes from current depth first search start point, the algorithm picks the next random univisted node and repeat the procedure. Note that low link value should only be updated when meeting node visited during current depth first search, not the previously visited ones.</p><p>Nodes with the same low link value belong to one strongly connected component.</p>";