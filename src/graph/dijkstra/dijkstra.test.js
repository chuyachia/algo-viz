import 'regenerator-runtime/runtime';

import { Vertex } from '../common/vertex';
import { dijkstraSolver } from './dijkstra';


test('Dijkstra finds shortest distance', () => {
  const n = 6;
  const vertices = new Array(n);
  for (let i = 0; i < n; i++) {
    vertices[i] = new Vertex(i);
  }

  vertices[0].addEdge(vertices[1], 10);
  vertices[0].addEdge(vertices[2], 15);
  vertices[1].addEdge(vertices[3], 12);
  vertices[1].addEdge(vertices[5], 15);
  vertices[2].addEdge(vertices[5], 10);
  vertices[3].addEdge(vertices[4], 1);
  vertices[3].addEdge(vertices[5], 2);
  vertices[4].addEdge(vertices[5], 5);

  let ds = dijkstraSolver(vertices[0, n, 0], n, 0);
  let res;
  {
    res = ds.next();
  } while(!res.done);

  let dist = res.value;

  expect(dist[0]).toBe(0);
  expect(dist[1]).toBe(10);
  expect(dist[2]).toBe(15);
  expect(dist[3]).toBe(22);
  expect(dist[4]).toBe(23);
  expect(dist[5]).toBe(24);
})

test('Dijkstra finds shortest distance 2', () => {
  const n = 5;
  const vertices = new Array(n);
  for (let i = 0; i < n; i++) {
    vertices[i] = new Vertex(i);
  }

  vertices[0].addEdge(vertices[1], 10);
  vertices[0].addEdge(vertices[4], 3);
  vertices[1].addEdge(vertices[2], 2);
  vertices[1].addEdge(vertices[4], 4);
  vertices[2].addEdge(vertices[3], 9);
  vertices[3].addEdge(vertices[2], 7);
  vertices[4].addEdge(vertices[1], 1);
  vertices[4].addEdge(vertices[2], 8);
  vertices[4].addEdge(vertices[3], 2);

  let ds = dijkstraSolver(vertices[0, n, 0], n, 0);
  let res;
  {
    res = ds.next();
  } while(!res.done);

  let dist = res.value;

  expect(dist[0]).toBe(0);
  expect(dist[1]).toBe(4);
  expect(dist[2]).toBe(6);
  expect(dist[3]).toBe(5);
  expect(dist[4]).toBe(3);
})