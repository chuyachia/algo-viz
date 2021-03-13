import 'regenerator-runtime/runtime';

import { Vertex } from '../common/vertex';
import { topologicalSort } from './topologicalSort';

test('Topological sort returns correct ordering', () => {
  const n = 13;
  const vertices = new Array(n);
  const inEdges = new Array(n);
  for (let i = 0; i < n; i++) {
    vertices[i] = new Vertex(i);
    inEdges[i] = [];
  }

  vertices[0].addEdge(vertices[3], 1);
  inEdges[3].push(0);
  vertices[1].addEdge(vertices[3], 1);
  inEdges[3].push(1);
  vertices[2].addEdge(vertices[0], 1);
  inEdges[0].push(2);
  vertices[2].addEdge(vertices[1], 1);
  inEdges[1].push(2);
  vertices[3].addEdge(vertices[6], 1);
  inEdges[6].push(3);
  vertices[3].addEdge(vertices[7], 1);
  inEdges[7].push(3);
  vertices[4].addEdge(vertices[0], 1);
  inEdges[0].push(4);
  vertices[4].addEdge(vertices[3], 1);
  inEdges[3].push(4);
  vertices[4].addEdge(vertices[5], 1);
  inEdges[5].push(4);
  vertices[5].addEdge(vertices[9], 1);
  inEdges[9].push(5);
  vertices[5].addEdge(vertices[10], 1);
  inEdges[10].push(5);
  vertices[6].addEdge(vertices[8], 1);
  inEdges[8].push(6);
  vertices[7].addEdge(vertices[8], 1);
  inEdges[8].push(7);
  vertices[7].addEdge(vertices[9], 1);
  inEdges[9].push(7);
  vertices[8].addEdge(vertices[11], 1);
  inEdges[11].push(8);
  vertices[9].addEdge(vertices[11], 1);
  inEdges[11].push(9);
  vertices[9].addEdge(vertices[12], 1);
  inEdges[12].push(9);
  vertices[10].addEdge(vertices[9], 1);
  inEdges[9].push(10);

  const ts = topologicalSort(vertices, 0);
  let state;
  {
    state = ts.next();
  } while(!state.done);

  let res = state.value;
  let visited = new Array(n);
  for (let id of res) {
    for (let inEdge of inEdges[id]) {
      expect(visited[inEdge]).toBe(true);
    }
    visited[id] = true;
  }
})
