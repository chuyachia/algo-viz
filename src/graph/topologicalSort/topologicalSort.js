import { BLUE, GREY, RED } from "../../util/colors";
import { LinkedList } from "../../util/linkedList";
import { Edge } from "../common/edge";

export function* topologicalSort(vertices) {
  const state = [];
  const sorted = [];
  let sortedIndex = vertices.length;
  const VISITING = 1;
  const VISITED = 2;
  let hasCycle = false;
  let pauseCount = 0;
  const visit = new LinkedList();
  const backtrack = new LinkedList();

  for (let vertex of vertices) {
    let seq = 0;
    if (hasCycle) {
      break;
    }

    if (state[vertex.id] === VISITED) {
      continue;
    }

    visit.addFirst({seq, edge : new Edge(0, null, vertex, 0, 0)});
    backtrack.addFirst({seq, edge: new Edge(0, null, vertex, 0, 0)});
    seq++;

    while (visit.size() > 0) {
      let currentEdge = visit.poll().edge;
      let current = currentEdge.to;

      state[current.id] = VISITING;
      currentEdge.changeColor(RED);
      current.changeColor(RED);

      pauseCount = 0;
      while (pauseCount < 50) {
        yield hasCycle ? [] : sorted;
        pauseCount++;
      }

      for (const [_, edge] of Object.entries(current.edges)) {
        let next = edge.to;
        if (state[next.id] == VISITED) {
          continue;
        }

        if (state[next.id] == VISITING) {
          hasCycle = true;
          break;
        }
  
        visit.addFirst({seq, edge});
        backtrack.addFirst({seq, edge});
        seq++;
      }


      while (backtrack.size() > 0 &&
       (visit.size() == 0 || visit.peek().seq != backtrack.peek().seq)) {
        let { edge } = backtrack.poll();
        let vertex = edge.to;
        state[vertex.id] = VISITED;
        edge.changeColor(GREY);
        vertex.changeColor(BLUE);
        vertex.value = sortedIndex;
        sorted[--sortedIndex] = vertex.id;
        pauseCount = 0;
        while (pauseCount < 50) {
          yield hasCycle ? [] : sorted;
          pauseCount++;
        }
      }
    }
  }
}