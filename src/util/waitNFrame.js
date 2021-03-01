export function* waitNFrame(n) {
  while (true) {
    for (let i = 0; i < n -1; i++) {
      yield false;
    }

    yield true;
  }
}