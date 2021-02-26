import { Vertex } from "./vertex";

export function drawVertices(p, n, canvasWidth, canvasHeight, graphRadius, vertexDiameter,  vertexRenderDisplayValue) {
  const vertices = [];

  let step = p.TWO_PI / n;
  let angle = 0;
  for (let i = 0;i < n;i++) {
    let x = graphRadius * p.cos(angle) + canvasWidth/2;
    let y = graphRadius * p.sin(angle) + canvasHeight/2;
    vertices.push(new Vertex(i, x, y, vertexDiameter, p, vertexRenderDisplayValue));
    angle += step;
  }

  return vertices;
}

export function getClosestVertex(p, vertices) {
  for (const v of vertices) {
    if (p.dist(p.mouseX, p.mouseY, v.x, v.y) < 10) {
      return v;
    }
  }    
}