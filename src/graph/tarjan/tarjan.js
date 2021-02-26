import { BLUE, RED } from "../../util/colors";

export function* tarjan(vertices) {
  const VISITING = 1;
  const VISITED = 2;
  const state = new Array(vertices.length);
  let lowLink = 0;
  let pauseCount = 0;

  for (const vertex of vertices) {
    if (state[vertex.id] === VISITED) {
      continue;
    }
    let dfsSolver = dfs(vertex, lowLink);
    while (!dfsSolver.next().done) {
      yield dfsSolver.next();
    }
  }

  function* dfs(vertex, startLowLink) {
    vertex.changeColor(RED);
    state[vertex.id] = VISITING;
    vertex.displayValue = lowLink++;
    pauseCount = 0;
    while (pauseCount < 50) {
      yield;
      pauseCount++;
    }

    for (const [_, edge] of Object.entries(vertex.edges)) {
      let nextVertex = edge.to;
      edge.changeColor(RED);
      pauseCount = 0;
      while (pauseCount < 50) {
        yield;
        pauseCount++;
      }
      if (state[nextVertex.id] === undefined) {
        let dfsSolver = dfs(nextVertex, startLowLink);
        while (!dfsSolver.next().done) {
          yield dfsSolver.next();
        }
      }

      if (nextVertex.displayValue >= startLowLink) {
        vertex.displayValue = Math.min(vertex.displayValue, nextVertex.displayValue);
      }
      edge.changeColor(BLUE);
      pauseCount = 0;
      while (pauseCount < 50) {
        yield;
        pauseCount++;
      }
    }
    vertex.changeColor(BLUE);
    state[vertex.id] = VISITED;
    pauseCount = 0;
    while (pauseCount < 50) {
      yield;
      pauseCount++;
    }
  }
}