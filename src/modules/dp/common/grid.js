import { Cell } from "./cell";

export function Grid(startX, startY) {
  const cellWidth = 40;
  const cellHeight = 30;
  const spaceBetween = 10;

  this.columnHeader = [];
  this.rowHeader = [];
  this.m = 0;
  this.n = 0;
  /**
   * @type {Cell[][]}
   */
  this.grid = [];

  this.display = function (p) {
    for (const cell of this.rowHeader) {
      let coord = getCoord(cell.x, cell.y);
      cell.display(p, cellWidth, cellHeight, coord[0], coord[1]);
    }

    for (const cell of this.columnHeader) {
      let coord = getCoord(cell.x, cell.y);
      cell.display(p, cellWidth, cellHeight, coord[0], coord[1]);
    }

    for (const row of this.grid) {
      for (const cell of row) {
        let coord = getCoord(cell.x, cell.y);
        cell.display(p, cellWidth, cellHeight, coord[0], coord[1]);
      }
    }
  };

  this.setColumnHeader = function (columnHeader) {
    this.columnHeader = columnHeader.map((v, i) => new Cell(i + 1, 0, v));
    this.m = columnHeader.length;
  };

  this.setRowHeader = function (rowHeader) {
    this.rowHeader = rowHeader.map((v, i) => new Cell(0, i + 1, v));
    this.n = rowHeader.length;
  };

  this.buildGrid = function () {
    this.grid = Array.from(Array(this.n), (_, y) =>
      Array.from(Array(this.m), (_, x) => new Cell(x + 1, y + 1, ""))
    );
  };

  function getCoord(x, y) {
    const xCoord = startX + x * (cellWidth + spaceBetween);
    const yCoord = startY + y * (cellHeight + spaceBetween);

    return [xCoord, yCoord];
  }
}
