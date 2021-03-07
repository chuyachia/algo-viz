import 'regenerator-runtime/runtime';

import { Vertex } from '../common/vertex';
import { hierholzer } from './hierholzer';

test('Heirholzer finds Eulerian path', () =>  {
  const n = 5;
  const vertices = new Array(n);
  for (let i = 0; i < n; i++) {
    vertices[i] = new Vertex(i);
  }

  vertices[0].addEdge(vertices[3], 1);
  vertices[0].addEdge(vertices[2], 1);
  vertices[1].addEdge(vertices[0], 1);
  vertices[3].addEdge(vertices[4], 1);
  vertices[4].addEdge(vertices[0], 1);

  const hs = hierholzer(vertices, 0);
  let state;
  {
    state = hs.next();
  } while (!state.done);

  let res = state.value;
  let expected = [1, 0, 3, 4, 0, 2];
  expect(res).toEqual(expected);
})