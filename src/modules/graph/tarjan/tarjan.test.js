import "regenerator-runtime/runtime";

import { Vertex } from "../common/vertex";
import { tarjan } from "./tarjan";

test("Tarjan finds strongly connected components", () => {
  const n = 5;
  const vertices = [];
  for (let i = 0; i < n; i++) {
    vertices[i] = new Vertex(i);
  }

  vertices[0].addEdge(vertices[2], 1);
  vertices[0].addEdge(vertices[3], 1);
  vertices[1].addEdge(vertices[0], 1);
  vertices[2].addEdge(vertices[1], 1);
  vertices[3].addEdge(vertices[4], 1);

  const ts = tarjan(vertices, 0);
  let state;
  {
    state = ts.next();
  }
  while (!state.done);

  let res = state.value;

  expect(res[0]).toBe(res[1]);
  expect(res[1]).toBe(res[2]);
  expect(res[3]).not.toBe(res[0]);
  expect(res[4]).not.toBe(res[0]);
  expect(res[4]).not.toBe(res[3]);
});

test("Tarjan finds strongly connected components 2", () => {
  const n = 8;
  const vertices = [];
  for (let i = 0; i < n; i++) {
    vertices[i] = new Vertex(i);
  }

  vertices[0].addEdge(vertices[1], 1);
  vertices[1].addEdge(vertices[2], 1);
  vertices[2].addEdge(vertices[0], 1);
  vertices[3].addEdge(vertices[4], 1);
  vertices[3].addEdge(vertices[7], 1);
  vertices[4].addEdge(vertices[5], 1);
  vertices[5].addEdge(vertices[0], 1);
  vertices[5].addEdge(vertices[6], 1);
  vertices[6].addEdge(vertices[0], 1);
  vertices[6].addEdge(vertices[2], 1);
  vertices[6].addEdge(vertices[4], 1);
  vertices[7].addEdge(vertices[3], 1);
  vertices[7].addEdge(vertices[5], 1);

  const ts = tarjan(vertices, 0);
  let state;
  {
    state = ts.next();
  }
  while (!state.done);

  let res = state.value;

  expect(res[0]).toBe(res[1]);
  expect(res[1]).toBe(res[2]);
  expect(res[3]).toBe(res[7]);
  expect(res[4]).toBe(res[5]);
  expect(res[5]).toBe(res[6]);
  expect(res[0]).not.toBe(res[3]);
  expect(res[0]).not.toBe(res[4]);
  expect(res[3]).not.toBe(res[4]);
});
