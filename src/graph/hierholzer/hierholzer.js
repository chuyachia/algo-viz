import { BLUE, RED } from "../../util/colors";
import { LinkedList } from "../../util/linkedList";
import { waitNFrame } from "../../util/waitNFrame";
import { Edge } from "../common/edge";

export function* hierholzer(vertices) {
  let shoudContinue = waitNFrame(50);
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

  let pathExists = true;
  let startVertex, endVertex;

  for (let i = 0; i < n; i++ ) {
    let vertex = vertices[i];
    let vertexId = vertex.id;
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

  let currentVertex = startVertex || vertices[0];
  const stack = new LinkedList();
  stack.addFirst(new Edge(0, null, currentVertex, 0, 0));

  while (currentVertex !== undefined && outDegree[currentVertex.id] > 0) {
    currentVertex.changeColor(RED);
    let out = outDegree[currentVertex.id];
    outDegree[currentVertex.id]--;
    let nextEdge = currentVertex.edges[out-1];
    nextEdge.changeColor(RED);
    currentVertex = nextEdge.to;
    stack.addFirst(nextEdge);
    
    while (shoudContinue.next().value === false) {
      yield true;
    }

    while (outDegree[currentVertex.id] === 0) {
      let backtrackEdge = stack.poll();
      let backtrackVertex = backtrackEdge.to;
      backtrackEdge.changeColor(BLUE);
      backtrackVertex.changeColor(BLUE);
      while (shoudContinue.next().value === false) {
        yield true;
      }
      if (backtrackVertex.displayValue.length > 0) {
        backtrackVertex.displayValue += ','+ edgeCount;
      } else {
        backtrackVertex.displayValue = edgeCount.toString();
      }
      edgeCount--;
      if (stack.size() > 0) {
        currentVertex = stack.peek().to;
      } else {
        currentVertex = undefined;
        break;
      }
    }

  }
}