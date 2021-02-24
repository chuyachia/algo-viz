import { LinkedList } from "../../util/linkedList";

export function* topologicalSort(vertices) {
  const state = [];
  const sorted = [];
  let sortedIndex = vertices.length;
  const VISITING = 1;
  const VISITED = 2;
  let hasCycle = false;
  let frameCount = 0;
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

    visit.addFirst({seq, vertex});
    backtrack.addFirst({seq, vertex});
    seq++;

    while (visit.size() > 0) {
      while (backtrack.size() > 0 && visit.peek().seq != backtrack.peek().seq ) {
        let backTrackV = backtrack.poll().vertex;
        state[backTrackV.id] = VISITED;
        backTrackV.changeColor(backTrackV.colors.DEFAULT);
        backTrackV.value = sortedIndex;
        sorted[--sortedIndex] = backTrackV.id;
        frameCount = 0;
        while (frameCount < 50) {
          yield hasCycle ? [] : sorted;
          frameCount++;
        }
      }

      let current = visit.poll().vertex;

      state[current.id] = VISITING;
      current.changeColor(current.colors.VISITING);

      for (const [_, edge] of Object.entries(current.edges)) {
        let next = edge.to;
        if (state[next.id] == VISITED) {
          continue;
        }

        if (state[next.id] == VISITING) {
          hasCycle = true;
          break;
        }
  
        next.changeColor(next.colors.REACHABLE);
        visit.addFirst({seq, vertex: next});
        backtrack.addFirst({seq, vertex: next});
        seq++;
      }

      frameCount = 0;
      while (frameCount < 50) {
        yield hasCycle ? [] : sorted;
        frameCount++;
      }
    }

    while (backtrack.size() > 0) {
      let backTrackV = backtrack.poll().vertex;
      state[backTrackV.id] = VISITED;
      backTrackV.changeColor(backTrackV.colors.DEFAULT);
      backTrackV.value = sortedIndex;
      sorted[--sortedIndex] = backTrackV.id;
      frameCount = 0;
      while (frameCount < 50) {
        yield hasCycle ? [] : sorted;
        frameCount++;
      }
    }
  }
}