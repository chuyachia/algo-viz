import { Cell } from "./cell";

export function Grid(startX, startY, p) {
  const cellWidth = 40;
  const cellHeight = 30;
  const spaceBetween = 10;

  this.columnHeader = []
  this.rowHeader = [];
  this.m = 0;
  this.n = 0;
  this.grid = [];


  this.display = function () {
    for (const cell of this.rowHeader) {
      cell.display();
    }

    for (const cell of this.columnHeader) {
      cell.display();
    }

    for (const row of this.grid) {
      for (const cell of row) {
        cell.display();
      }
    }
  }

  this.setColumnHeader = function(columnHeader) {
    this.columnHeader = columnHeader.map((v, i) => getCell(i + 1, 0, v));
    this.m = columnHeader.length;
  }


  this.setRowHeader = function(rowHeader) {
    this.rowHeader = rowHeader.map((v, i) => getCell(0, i+1, v));
    this.n = rowHeader.length;
  }

  this.buildGrid = function() {
    this.grid = Array.from(Array(this.n), (_, y) => Array.from(Array(this.m), (_, x) => getCell(x + 1, y + 1, '')))
  }

  function getCell(x, y, value) {
    const xCoord = startX + x * (cellWidth + spaceBetween);
    const yCoord = startY + y * (cellHeight + spaceBetween);

    return new Cell(xCoord, yCoord, cellWidth, cellHeight, value, p);
  }
}