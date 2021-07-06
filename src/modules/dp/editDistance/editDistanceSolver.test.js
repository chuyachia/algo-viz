import "regenerator-runtime/runtime";

import { editDistance } from "./editDistanceSolver";

test("Edit distance solves correctly", () => {
  let from = "apple";
  let to = "pineapple";
  let res = editDistance(from, to);
  expect(res).toBe(4);
});
