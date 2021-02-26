import { LinkedList } from "../../util/linkedList";

export function* tarjan(vertices) {
  const VISITING = 1;
  const VISITED = 2;
  const state = new Array(vertices.length);
  const visit = new LinkedList();
  const backtrack = new LinkedList();
  let lowLink = 0;
  let pauseCount = 0;

  for (const vertex of vertices) {
    if (state[vertex.id] === VISITED) {
      continue;
    }

    let startLowLink = lowLink;
    let seq = 0;
    visit.addFirst({seq, vertex});
    backtrack.addFirst({seq, vertex});
    seq++;

    while (visit.size() > 0) {
      let currentVertex = visit.poll().vertex;
      state[currentVertex.id] = VISITING;
      currentVertex.displayValue = lowLink++;  
      const randomColorObject = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      }
      
      currentVertex.changeColor(randomColorObject);
      pauseCount = 0;
      while (pauseCount < 50) {
        yield;
        pauseCount++;
      }

      for (const [_, edge] of Object.entries(currentVertex.edges)) {
        let nextVertex = edge.to;

        if (state[nextVertex.id] === undefined) {
          visit.addFirst({seq, vertex : nextVertex});
          backtrack.addFirst({seq, vertex : nextVertex});
          seq++;
        } else if (nextVertex.displayValue >=startLowLink) {

          while (backtrack.size() > 0 && (visit.size() === 0 || backtrack.peek().seq !== visit.peek().seq)) {
            let backtrackVertex = backtrack.poll().vertex;
            state[backtrackVertex.id] = VISITED;
            backtrackVertex.displayValue = Math.min(backtrackVertex.displayValue, nextVertex.displayValue);
            backtrackVertex.changeColor(nextVertex.getColor());
            pauseCount = 0;
            while (pauseCount < 50) {
              yield;
              pauseCount++;
            }
          }
        }
      }

      while (backtrack.size() > 0  && (visit.size() === 0 || backtrack.peek().seq !== visit.peek().seq)) {
        let backtrackVertex = backtrack.poll().vertex;
        state[backtrackVertex.id] = VISITED;
      }
    }
  }
}