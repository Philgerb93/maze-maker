function Cell(i, j) {
    this.i = i;
    this.j = j;
  
    this.topWall = true;
    this.rightWall = true;
    this.bottomWall = true;
    this.leftWall = true;
  
    this.visited = false;
    this.important = false;
    this.inPath = false;
  
    this.show = function() {
      let x = this.i * cellSize;
      let y = this.j * cellSize;
  
      stroke(0);
  
      if (this.topWall) {
        line(x, y, x + cellSize, y);
      }
      if (this.rightWall) {
        line(x + cellSize, y, x + cellSize, y + cellSize);
      }
      if (this.bottomWall) {
        line(x, y + cellSize, x + cellSize, y + cellSize);
      }
      if (this.leftWall) {
        line(x, y, x, y + cellSize);
      }
  
      if (this.visited) {
        noStroke();
        fill(0, 0, 0, 20);
        rect(x, y, cellSize, cellSize);
      }
  
      if (this.important) {
        noStroke();
        fill(255, 0, 0, 100);
        rect(x, y, cellSize, cellSize);
      } else if (this.inPath) {
        noStroke();
        fill(0, 255, 0, 40);
        rect(x, y, cellSize, cellSize);
      }
    }
  
    this.getUnvisitedNeighbor = function() {
      let neighbors = [];
  
      let top = this.j > 0 ? grid[this.i][this.j - 1] : undefined;
      let right = this.i < nbCols - 1 ? grid[this.i + 1][this.j] : undefined;
      let bottom = this.j < nbRows - 1 ? grid[this.i][this.j + 1] : undefined;
      let left = this.i > 0 ? grid[this.i - 1][this.j] : undefined;
  
      if (top && !top.visited) {
        neighbors.push(top);
      }
      if (right && !right.visited) {
        neighbors.push(right);
      }
      if (bottom && !bottom.visited) {
        neighbors.push(bottom);
      }
      if (left && !left.visited) {
        neighbors.push(left);
      }
  
      return neighbors.length > 0 ? neighbors[floor(random(0, neighbors.length))] : undefined;
    }
  
    this.highlight = function() {
      let x = this.i * cellSize;
      let y = this.j * cellSize;
      noStroke();
      fill(0, 0, 255, 255);
      rect(x, y, cellSize, cellSize);
    }
  }