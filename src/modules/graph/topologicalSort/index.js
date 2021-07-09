import { BLUE, GREY, RED } from "../../util/colors";
import { drawVertices, getClosestVertex } from "../common/graph";
import { GrowingEdge } from "../common/growingEdge";
import { topologicalSort } from "./topologicalSort";

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
  let topoSortSolver;
  let topoOrdering = [];

  p.setup = function () {
    p.createCanvas(canvasWidth, canvasHeight);
    drawButton();
    vertices = drawVertices(p, n, canvasWidth, canvasHeight, radius, "?");
  };

  function drawButton() {
    button = p.createButton("");
    button.position(10, 40);
    button.addClass("action-button");
  }

  p.draw = function () {
    p.background(255, 255, 255);
    showInstructions();
    showLabels();

    if (mode == 0) {
      if (pendingEdge !== undefined) {
        pendingEdge.display(p);
      }
    } else if (mode == 1) {
      let state = topoSortSolver.next();
      if (state.done) {
        topoOrdering = state.value;
        mode = 2;
      }
    }

    for (const v of vertices) {
      v.displayEdges(p, vertexDiameter);
    }

    // So that vertex text will show on top of edge arrow
    for (const v of vertices) {
      v.display(p, vertexDiameter);
    }
  };

  function showLabels() {
    p.push();
    p.strokeWeight(0);
    p.fill(GREY.r, GREY.g, GREY.b);
    p.circle(vertexDiameter, canvasHeight - vertexDiameter, vertexDiameter);
    p.textAlign(p.LEFT);
    p.fill(0, 0, 0);
    p.text("ID : order", 2 * vertexDiameter, canvasHeight - vertexDiameter);
    p.fill(RED.r, RED.g, RED.b);
    p.circle(vertexDiameter, canvasHeight - 2 * vertexDiameter, vertexDiameter);
    p.text("Visiting", 2 * vertexDiameter, canvasHeight - 2 * vertexDiameter);
    p.fill(BLUE.r, BLUE.g, BLUE.b);
    p.circle(vertexDiameter, canvasHeight - 3 * vertexDiameter, vertexDiameter);
    p.text("Visited", 2 * vertexDiameter, canvasHeight - 3 * vertexDiameter);
    p.pop();
  }

  function showInstructions() {
    switch (mode) {
      case 0:
        p.text(
          "Click on nodes to add link.\n" +
            "Once the graph is done, click on the button to find the topological ordering of the nodes",
          10,
          10
        );
        button.html("Find topological ordering");
        button.show();
        button.mousePressed(function () {
          mode = 1;
          topoSortSolver = topologicalSort(vertices, 50);
        });
        break;
      case 1:
        p.text("Finding topological ordering", 10, 10);
        button.hide();
        break;
      case 2:
        if (topoOrdering.length == 0) {
          p.text(
            "Graph contains cycle. Topological ordering does not exist",
            10,
            10
          );
        } else {
          p.text("Topological ordering found", 10, 10);
        }
        button.show();
        button.html("Restart");
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
    vertices = drawVertices(p, n, canvasWidth, canvasHeight, radius, "?");
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
      pendingEdge = new GrowingEdge(pendingEdgeFrom.x, pendingEdgeFrom.y);
    } else {
      pendingEdgeFrom.addEdge(currentVertex, 1);
      pendingEdgeFrom = undefined;
      pendingEdge = undefined;
    }
  };
}

export const explainText =
  "<p><strong>Topological ordering</strong> of a graph is an ordering of the nodes in the graph following which all of one node's dependencies will visited before itself. The dependencies of a node are the nodes connected to it by incoming edges. Topological ordering does not exist on graphs that contain cycles</p><p>Topological sort algorithm starts at a random node and performs depth first search to visit all its neighbors and their neighbors until no unvisited node can be reached. At this point, the algorithm backtracks and adds nodes to the back of a list of ordered nodes. After backtracking is done, the algorithm pick the next unvisited node and repeat the procedure until all nodes are visited.</p>";
