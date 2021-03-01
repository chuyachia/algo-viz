import { BLUE, GREY, RED } from '../../util/colors';
import { PriorityQueue } from '../../util/priorityQueue';
import { waitNFrame } from '../../util/waitNFrame';

export function* dijkstraSolver(startVertex, n) {
  const dist = new Array(n);
  const visited = new Array(n);
  let shoudContinue = waitNFrame(50);
  const pq = new PriorityQueue((p1, p2) => p1[0] - p2[0]);

  pq.add([0, startVertex]);
  dist[startVertex.id] = 0;
  startVertex.displayValue = 0;

  while (pq.size() > 0) {
    let [currentWeight, currentVertex] = pq.poll();
    if (visited[currentVertex.id]) {
      continue;
    }

    visited[currentVertex.id] = true;
    currentVertex.changeColor(RED);

    while (shoudContinue.next().value === false) {
      yield;
    }

    for (const [_, nextEdge] of Object.entries(currentVertex.edges)) {
      let nextWeight = currentWeight + nextEdge.weight;
      let nextVertex = nextEdge.to;
      nextEdge.changeColor(RED);
      nextVertex.changeColor(BLUE);
      if (dist[nextVertex.id] === undefined || nextWeight < dist[nextVertex.id]) {
        dist[nextVertex.id] = nextWeight;
        nextVertex.displayValue = nextWeight.toFixed(2);
        pq.add([ nextWeight, nextVertex]);
      }
      while (shoudContinue.next().value === false) {
        yield;
      }
      nextEdge.changeColor(GREY);
    }

    currentVertex.changeColor(BLUE);
  }
}