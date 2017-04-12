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
var lifeArray = [];
var continueArray = [];

//set up
var timer = null;
var canvas = $("#board").get(0);
var ctx = canvas.getContext("2d");
//Cell size
var scale = 4;

var wWidth = window.innerWidth;

if(wWidth < 400){
    canvas.width = canvas.width-100;
    canvas.height = canvas.height-100;
    scale = 3 
}
//world size
var cells = new Array((100));



var toUpdate = new Array();


function load() {
    //generates a map of 'dead' cells
    for (var i = 0; i < cells.length; i++) {
        cells[i] = [];
        for (var j = 0; j < cells.length; j++) {
            cells[i][j] = new cell();
            draw(i, j);
        }
    }

    setRules();
    glider();
}


//Draw the Cell
function draw(x, y) {
    var color = (cells[x][y].state === 1) ? "#ffbf00" : "#151515";
    ctx.beginPath();
    ctx.fillStyle = color;

    ctx.rect((x) * scale, (y) * scale, scale, scale);
    ctx.fill();
}

function neighborsTorus(x, y) {
    var number = 0;
    number = number + getN(0,1);
    number = number + getN(1,1);
    number = number + getN(1,0);
    number = number + getN(1,-1);
    number = number + getN(0,-1);
    number = number + getN(-1,-1);
    number = number + getN(-1,0);
    number = number + getN(-1,1);

    return number;

    function getN(xMod, yMod){
        newX = x + xMod;
        newY = y + yMod;
        
        newX = (newX < 0) ? cells.length-1 : (newX > cells.length-1) ? 0 : newX;
        newY = (newY < 0) ? cells.length-1 : (newY > cells.length-1) ? 0 : newY;
        
        if(cells[newX][newY].state === 1){
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

function update() {
    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells.length; j++) {
            lifeDeath(i, j)
        }
    };
    setAndDraw();
}

function step() {
    update();
}

function setAndDraw() {
    toUpdate.forEach(function (c) {
        cells[c.x][c.y].state = c.toState;
        cells[c.x][c.y].gen = c.toState;
        draw(c.x, c.y);
    });
    toUpdate.length = 0;
}


//-------Controls---------


$("#play").click(function () {
    if (timer !== null)
        return;
    timer = setInterval(function () {
        step();
    }, 50);
});

$("#pause").click(function () {
    clearInterval(timer);
    timer = null;
});


$(document).ready(function () {
    $("#board").bind("mousedown", function (e) {
        findCell(e);
    });
});


//-------Helpers---------


//Get the cell under the mouse, to draw
function findCell(e) {
    var x = Math.floor(e.offsetX / scale);
    var y = Math.floor(e.offsetY / scale);

    if (cells[x][y].state === 0) {
        cells[x][y].state = 1;
    } else {
        cells[x][y].state = 0;
    }
    draw(x, y);
}

//Genreate a random map
function rand() {

    //clear();

    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells.length; j++) {
            var state = Math.round(Math.random());
            cells[i][j].state = state;
            cells[i][j].gen = state;
            draw(i, j);
        }
    }

}

//Wipe the cells to an empty map
function clear() {
    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells.length; j++) {
            cells[i][j].state = 0;
            cells[i][j].gen = 0;
            draw(i, j);
        }
    }
}

//Generate a small segment of a random map
function seed() {
    clear();

    for (var i = 45; i < 55; i++) {
        for (var j = 45; j < 55; j++) {
            var state = Math.round(Math.random());
            cells[i][j].state = state;
            draw(i, j);
        }
    }
}

function glider() {
    clear();
    toUpdate.push({ x: 3, y: 3, toState: 1 })
    toUpdate.push({ x: 2, y: 3, toState: 1 })
    toUpdate.push({ x: 1, y: 3, toState: 1 })
    toUpdate.push({ x: 3, y: 2, toState: 1 })
    toUpdate.push({ x: 2, y: 1, toState: 1 })

    setAndDraw();
}

function setRules() {

    lifeArray = [];
    continueArray = [];

    $(".life:checked").each(function () {
        lifeArray.push(parseInt($(this).val()));
    });
    $(".death:checked").each(function () {
        continueArray.push(parseInt($(this).val()));
    });
}