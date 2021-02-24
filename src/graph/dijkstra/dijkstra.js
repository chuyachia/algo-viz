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
    fromVertex.changeColor(fromVertex.colors.VISITING);
    currentVertex.changeColor(currentVertex.colors.VISITING);

    let frameCount = 0;
    while (frameCount < 50) {
      yield;
      frameCount++;
    }

    console.info("Current shortest distance to vertex " + currentVertex.id + ": " + dist[currentVertex.id]);
    console.info("New distance to vertex " + currentVertex.id + ": " + currentWeight);

    if (dist[currentVertex.id] == undefined || currentWeight < dist[currentVertex.id]) {
      console.info("New shortest distance found");
      dist[currentVertex.id] = currentWeight;
      currentVertex.value = currentWeight;
      currentEdge.changeColor(currentEdge.colors.SELECTED);
      for (const [_, nextEdge] of Object.entries(currentVertex.edges)) {
        pq.add([currentWeight + nextEdge.weight, nextEdge]);
      }
    } else {
      currentEdge.changeColor(currentEdge.colors.DEFAULT);
    }
    fromVertex.changeColor(fromVertex.colors.REACHABLE);
    currentVertex.changeColor(currentVertex.colors.REACHABLE);


    frameCount = 0;
    while (frameCount < 50) {
      yield;
      frameCount++;
    }
  }
}