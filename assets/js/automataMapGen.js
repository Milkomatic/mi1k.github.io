/*
    Reworked Cellular Automata

    After working more with JS i've realized how awful my old code was. 
    Now I'm working on a newer, more effeicent implemetnation of
    Conway's game of life and other rules

    Scott Campebell
    2017
 */

//Cell object. 
function cell() {
  this.state = 0
  this.gen = 0
};

//Rules 
var lifeArray = [3, 6, 7, 8];
var continueArray = [3, 4, 6, 7, 8];

//set up
var timer = null;
var canvas = $("#board").get(0);
var ctx = canvas.getContext("2d");

//Cell size
var scale = 5;
//world size
var cells = new Array((500 / scale));
var toUpdate = new Array();


function load() {
  //generates a map of 'dead' cells
  for (var i = 0; i < cells.length; i++) {
    cells[i] = [];
    for (var j = 0; j < cells.length; j++) {
      cells[i][j] = new cell();
      //draw(i, j);
    }
  }
  map();
}

function neighborsTorus(x, y) {
  var number = 0;
  number = number + getN(0, 1);
  number = number + getN(1, 1);
  number = number + getN(1, 0);
  number = number + getN(1, -1);
  number = number + getN(0, -1);
  number = number + getN(-1, -1);
  number = number + getN(-1, 0);
  number = number + getN(-1, 1);

  return number;

  function getN(xMod, yMod) {
    newX = x + xMod;
    newY = y + yMod;

    newX = (newX < 0) ? cells.length - 1 : (newX > cells.length - 1) ? 0 : newX;
    newY = (newY < 0) ? cells.length - 1 : (newY > cells.length - 1) ? 0 : newY;

    if (cells[newX][newY].state === 1) {
      return 1;
    }
    return 0;
  }
}


function lifeDeath(x, y) {
  var numNeighbors = neighborsTorus(x, y);
  var cont = false;

  if (cells[x][y].state === 1) {
    for (var j = 0; j < continueArray.length; j++) {
      if (numNeighbors === continueArray[j]) {
        cont = true;
        cells[x][y].gen++;
      }
    }
    if (cont === false) {
      toUpdate.push({ x: x, y: y, toState: 0 })
    }
  } else if (cells[x][y].state === 0) {
    for (var i = 0; i < lifeArray.length; i++) {
      if (numNeighbors === lifeArray[i]) {
        toUpdate.push({ x: x, y: y, toState: 1 })
        break;
      }
    }
  }
}

//Genreate a random map
function rand() {

  for (var i = 0; i < cells.length; i++) {
    for (var j = 0; j < cells.length; j++) {
      var state = Math.round(Math.random());
      cells[i][j].state = state;
      cells[i][j].gen = state;
      //draw(i, j);
    }
  }

}


function map() {

  rand();

  var topReached = false;

  while (!topReached) {
    for (var i = 0; i < cells.length; i++) {
      for (var j = 0; j < cells.length; j++) {
        lifeDeath(i, j);
        if (cells[i][j].gen === 140) {
          topReached = true;
        }
      }
    }
    toUpdate.forEach(function (c) {
      cells[c.x][c.y].state = c.toState;
      cells[c.x][c.y].gen = c.toState;
    }); 
    toUpdate.length = 0;
  }
  drawMap();
}

function drawMap() {
  getSettings()
  for (var i = 0; i < cells.length; i++) {
    for (var j = 0; j < cells.length; j++) {
      ctx.beginPath();
      for (var r = 0; r < MapSettings.length; r++){
        if (cells[i][j].gen >= MapSettings[r].min){
          ctx.fillStyle = MapSettings[r].color;
        }
      }
      ctx.rect((i) * scale, (j) * scale, scale, scale);
      ctx.fill();
    }
  }
}

//--------MAP SETTINGS-------

function getSettings(){
  for(i = 1; i < 10; i++){
    MapSettings[i].min = $("#region"+i)[0].value;
  }
}


var MapSettings = [
    {min: 0, color: "#84B9E3"},
    {min: 2, color: "#B9E3FF"},
    {min: 11, color: "#ACD0A5"},
    {min: 28, color: "#84BF8B"},
    {min: 53, color: "#0A480D"},
    {min: 77, color: "#94BF8B"},
    {min: 104, color: "#D3CA9D"},
    {min: 121, color: "#C3A76B"},
    {min: 127, color: "#a5a4a2"},
    {min: 134, color: "#fff"}
];
