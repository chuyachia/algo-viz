import { BLUE, RED } from "../../util/colors";
import { LinkedList } from "../../util/linkedList";
import { waitNFrame } from "../../util/waitNFrame";
import { Edge } from "../common/edge";

export function* hierholzer(vertices, waitFrame) {
  let canContinue = waitNFrame(waitFrame);
  let n = vertices.length;
  let edgeCount = 0;
  let inDegree = new Array(n);
  inDegree.fill(0);
  let outDegree = new Array(n);
  outDegree.fill(0);

  for (const vertex of vertices) {
    edgeCount+= vertex.edges.length;
    outDegree[vertex.id] = vertex.edges.length;
    for (const edge of vertex.edges) {
      inDegree[edge.to.id]++;
    }
  }

  const visitOrder = [];
  let pathExists = true;
  let startVertex, endVertex, linkedVertex;

  for (let i = 0; i < n; i++ ) {
    let vertex = vertices[i];
    let vertexId = vertex.id;
    if (outDegree[vertexId] > 0) {
      linkedVertex = vertex;
    }

    if (Math.abs(outDegree[vertexId] - inDegree[vertexId]) > 1)  {
      pathExists = false;
      break;
    } else if (Math.abs(outDegree[vertexId] - inDegree[vertexId]) === 1) {
      if (outDegree[vertexId] > inDegree[vertexId]) {
        if (startVertex === undefined) {
          startVertex = vertex;
        } else {
          pathExists = false;
          break;
        }
      } else {
        if (endVertex === undefined) {
          endVertex = vertex;
        } else {
          pathExists = false;
          break;
        }
      }
    }
  }

  if (!pathExists) {
    return false;
  }

  let currentVertex = startVertex || linkedVertex;
  const stack = new LinkedList();
  stack.addFirst(new Edge(0, null, currentVertex));
  let order = edgeCount;

  while (currentVertex !== undefined && outDegree[currentVertex.id] > 0) {
    currentVertex.changeColor(RED);
    let out = outDegree[currentVertex.id];
    outDegree[currentVertex.id]--;
    let nextEdge = currentVertex.edges[out-1];
    nextEdge.changeColor(RED);
    currentVertex = nextEdge.to;
    stack.addFirst(nextEdge);
    
    while (canContinue.next().value === false) {
      yield;
    }

    while (outDegree[currentVertex.id] === 0) {
      let backtrackEdge = stack.poll();
      let backtrackVertex = backtrackEdge.to;
      backtrackEdge.changeColor(BLUE);
      backtrackVertex.changeColor(BLUE);
      while (canContinue.next().value === false) {
        yield;
      }
      if (backtrackVertex.displayValue && backtrackVertex.displayValue.length > 0) {
        backtrackVertex.displayValue += ','+ order;
      } else {
        backtrackVertex.displayValue = order.toString();
      }
      visitOrder.unshift(backtrackVertex.id);
      order--;
      if (stack.size() > 0) {
        currentVertex = stack.peek().to;
      } else {
        currentVertex = undefined;
        break;
      }
    }
  }

  const hasPath = visitOrder.length === edgeCount+1;

  return hasPath? visitOrder: false;
}