/*
Instructions:
mouse click- Toggle cell
keyboard press - start simulation

Enjoy this MASTERPIECE!
*/




//start settings

let ROWS = 42 //constants for default rows and columns
let COLUMNS = 42
let SPACING = 15
let SIZE = 10
//initalises my_grid to an empty grid
let my_grid = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));

// sets a 'glider' to the board for testing and entertainment
my_grid[3][3] = 1
my_grid[3][5] = 1
my_grid[4][5] = 1
my_grid[4][4] = 1
my_grid[5][4] = 1

//initialise old_grid to my_grid
let old_grid = my_grid

//initialises start indicator
let s_pressed = false

//draws a grid from the my_grid variable
function grid() {
  for(let y = 0; y < COLUMNS; y++){
    for(let x = 0; x < ROWS; x++){
      push()
      translate(SPACING * x , SPACING * y)
      button(my_grid[y][x])
      pop()
    }
  }
}

//draws a button which is either on or off
function button(on) {
  push();
  fill(on ? (56, 68, 171) : (171, 56, 56));
  rect(-8, -8, SIZE, SIZE, 3);
  pop();
}

function mouseClicked() {
    mousecellx = Math.floor((mouseX - (mouseX % (SPACING/2))) / SPACING - 0,5)
    mousecelly = Math.floor((mouseY - (mouseY % (SPACING/2))) / SPACING - 0,5)
    console.log("mouse pressed " + mousecellx + " " +  mousecelly)
    if (mousecellx <= COLUMNS && mousecelly <= ROWS) {
        if (my_grid[mousecelly][mousecellx]) {
            console.log("turn off")
            my_grid[mousecelly][mousecellx] = 0
            translate(SPACING, SPACING)
            grid()
        } else {
            console.log("turn on")
            my_grid[mousecelly][mousecellx] = 1
            translate(SPACING, SPACING)
            grid()
        }
        
    }
}

//function on how many neighbours a certain cell has
function howManyNeighbours(cellx, celly) {

  let neighbours = 0;
  //checks if all sides are free
  let left = cellx
  let right = (cellx != (COLUMNS - 1))
  let up = celly
  let down = (celly != (ROWS - 1))

  if (left) {
    if (up) {
      if (old_grid[celly - 1][cellx - 1]) {
        neighbours++
      }
    }
    if (old_grid[celly][cellx - 1]) {
      neighbours++
    }
  }

  if (down) {
    if (left) {
      if (old_grid[celly + 1][cellx - 1]) {
        neighbours++
      }
    }
    if (old_grid[celly + 1][cellx]) {
      neighbours++
    }
  }

  if (right) {
    if (down) {
      if (old_grid[celly + 1][cellx + 1]) {
        neighbours++
      }
    }
    if (old_grid[celly][cellx + 1]) {
      neighbours++
    }
  }

  if (up) {
    if (right) {
      if (old_grid[celly - 1][cellx + 1]) {
        neighbours++
      }
    }
    if (old_grid[celly -1][cellx]) {
      neighbours++
    }
  }

  return neighbours
}

//actualises the board from old_grid to new_grid by the game of life rules
function actualiseBoard() {
  let neighbours
  let alive
  for(let y = 0; y < COLUMNS; y++){
    for(let x = 0; x < ROWS; x++){
      neighbours = howManyNeighbours(x, y)
      alive = old_grid[y][x]
      if (neighbours == 3 && !alive) {
        my_grid[y][x] = 1
      }
      else if ((neighbours == 2 || neighbours == 3) && alive) {
        my_grid[y][x] = 1
      }
      else if (neighbours > 3 && alive) {
        my_grid[y][x] = 0
      }
      else if (neighbours < 2 && alive) {
        my_grid[y][x] = 0
      }
      else {
        my_grid[y][x] = 0  
      }
    }
  }
}

//setup function
function setup() {
    createCanvas(1600, 1600);
    colorMode(RGB, 255);
    frameRate(60);
    noStroke();
    background(51);

    //draw inital grid
    translate(SPACING, SPACING)
    grid();
}

//resets, actualises and draws the board
function draw() {
    if (keyIsPressed) {
    s_pressed = true
    }

    if (s_pressed && frameCount % 5 == 0){
        old_grid = my_grid
        my_grid = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
        actualiseBoard()
        translate(SPACING, SPACING)
        grid();
    }
}

//dang it im so tired
