import { Vertex } from "./vertex";

export function drawVertices(
  p,
  n,
  canvasWidth,
  canvasHeight,
  graphRadius,
  vertexDiameter,
  vertexRenderDisplayValue
) {
  const vertices = [];

  const step = p.TWO_PI / n;
  let angle = 0;
  for (let i = 0; i < n; i++) {
    const x = graphRadius * p.cos(angle) + canvasWidth / 2;
    const y = graphRadius * p.sin(angle) + canvasHeight / 2;
    const v = new Vertex(i, x, y);
    v.displayValue = vertexRenderDisplayValue;
    vertices.push(v);
    angle += step;
  }

  return vertices;
}

export function getClosestVertex(p, vertices) {
  for (const v of vertices) {
    if (p.dist(p.mouseX, p.mouseY, v.x, v.y) < 20) {
      return v;
    }
  }
}
