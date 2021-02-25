import { BLUE, GREY, RED } from '../../util/colors';
import { PriorityQueue } from '../../util/priorityQueue';

export function* dijkstraSolver(startVertex, n) {
  const dist = new Array(n);
  dist[startVertex.id] = 0;
  startVertex.value = 0;
  const pq = new PriorityQueue((p1, p2) => p1[0] - p2[0]);

  for (const [_, edge] of Object.entries(startVertex.edges)) {
    pq.add([edge.weight, edge]);
  }

  while (pq.size() > 0) {
    let [currentWeight, currentEdge] = pq.poll();
    let fromVertex = currentEdge.from;
    let currentVertex = currentEdge.to;
    fromVertex.changeColor(RED);
    currentVertex.changeColor(RED);
    currentEdge.changeColor(RED);

    let pauseCount = 0;
    while (pauseCount < 50) {
      yield;
      pauseCount++;
    }

    if (dist[currentVertex.id] == undefined || currentWeight < dist[currentVertex.id]) {
      dist[currentVertex.id] = currentWeight;
      currentVertex.value = currentWeight;
      currentEdge.changeColor(BLUE);
      for (const [_, nextEdge] of Object.entries(currentVertex.edges)) {
        pq.add([currentWeight + nextEdge.weight, nextEdge]);
      }
    } else {
      currentEdge.changeColor(GREY);
    }

    fromVertex.changeColor(BLUE);
    currentVertex.changeColor(BLUE);

    pauseCount = 0;
    while (pauseCount < 50) {
      yield;
      pauseCount++;
    }
  }
}