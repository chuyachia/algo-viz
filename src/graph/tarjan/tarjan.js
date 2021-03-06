import { GREY, RED } from "../../util/colors";
import { Stack } from "../../util/stack";
import { waitNFrame } from "../../util/waitNFrame";
import { Edge } from "../common/edge";

export function* tarjan(vertices) {
  let shoudContinue = waitNFrame(50);
  const VISITING = 1;
  const VISITED = 2;
  const state = new Array(vertices.length);
  const visit = new Stack();
  const backtrack = new Stack();
  let lowLink = 0;

  for (const vertex of vertices) {
    if (state[vertex.id] === VISITED) {
      continue;
    }

    let startLowLink = lowLink;
    let seq = 0;
    visit.push({seq, edge : new Edge(0, null, vertex, 0, 0)});
    backtrack.push({seq, edge : new Edge(0, null, vertex, 0, 0)});
    seq++;

    while (visit.size() > 0) {
      let currentEdge = visit.pop().edge;
      let currentVertex = currentEdge.to;
      state[currentVertex.id] = VISITING;
      currentVertex.value = lowLink
      currentVertex.displayValue = `group ${lowLink++}`;  
      const randomColorObject = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      }
      
      currentEdge.changeColor(RED);
      currentVertex.changeColor(randomColorObject);
      while (shoudContinue.next().value === false) {
        yield;
      }

      for (const edge of currentVertex.edges) {
        let nextVertex = edge.to;
        if (state[nextVertex.id] === undefined) {
          visit.push({seq, edge });
          backtrack.push({seq, edge });
          seq++;
        } else if (nextVertex.value >=startLowLink) {
          edge.changeColor(RED);
          while (shoudContinue.next().value === false) {
            yield;
          }
          edge.changeColor(GREY);
          while (backtrack.size() > 0 && (visit.size() === 0 || backtrack.peek().seq !== visit.peek().seq)) {
            let backtrackEdge = backtrack.pop().edge;
            let backtrackVertex = backtrackEdge.to;
            state[backtrackVertex.id] = VISITED
            if (nextVertex.value < backtrackVertex.value) {
              backtrackVertex.displayValue =nextVertex.displayValue;
              backtrackVertex.changeColor(nextVertex.getColor());
            }
            backtrackEdge.changeColor(GREY);
            while (shoudContinue.next().value === false) {
              yield;
            }
          }
        }
      }


      while (backtrack.size() > 0  && (visit.size() === 0 || backtrack.peek().seq !== visit.peek().seq)) {
        let backtrackEdge = backtrack.pop().edge;
        let backtrackVertex = backtrackEdge.to;
        backtrackEdge.changeColor(GREY);
        state[backtrackVertex.id] = VISITED;
        while (shoudContinue.next().value === false) {
          yield;
        }
      }

    }
  }
}