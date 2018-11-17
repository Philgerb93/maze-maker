let nbCols = 30;
let nbRows = 30;
let cellSize = 15;
let grid = [];
let stack = [];
let current;
let exitFound = false;

function setup() {
  createCanvas(cellSize * nbCols, cellSize * nbRows);

  for (let j = 0; j < nbRows; j++) {
    for (let i = 0; i < nbCols; i++) {
      if (grid.length <= i) {
        grid.push([]);
      }
      grid[i].push(new Cell(i, j));
    }
  }
  current = grid[0][0];
  current.important = true;
  grid[nbCols - 1][nbRows - 1].important = true;
}

function draw() {
  background(255);

  for (let j = 0; j < nbRows; j++) {
    for (let i = 0; i < nbCols; i++) {
      grid[i][j].show();
    }
  }

  current.visited = true;
  if (!exitFound) {
    current.inPath = true;
  }

  if (current.i === nbCols - 1 && current.j === nbRows - 1) {
    exitFound = true;
  }

  let next = current.getUnvisitedNeighbor();
  if (next) {
    current.highlight();
    stack.push(current);
    removeWall(current, next);

    next.visited = true;
    current = next;
  } else if (stack.length > 0) {
    if (!exitFound) {
      current.inPath = false;
    }
    current.highlight();
    current = stack.pop();
  }
}

function removeWall(currentCell, nextCell) {
  if (currentCell.j > nextCell.j) {
    currentCell.topWall = false;
    nextCell.bottomWall = false;
  } else if (currentCell.i < nextCell.i) {
    currentCell.rightWall = false;
    nextCell.leftWall = false;
  } else if (currentCell.j < nextCell.j) {
    currentCell.bottomWall = false;
    nextCell.topWall = false;
  } else {
    currentCell.leftWall = false;
    nextCell.rightWall = false;
  }
}
