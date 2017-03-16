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
var scale = 5;
//world size
var cells = new Array((500 / scale) + 2);
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
    var color = (cells[x][y].state === 1) ? "#ffbf00" : "#000";
    ctx.beginPath();
    ctx.fillStyle = color;

    ctx.rect((x - 1) * scale, (y - 1) * scale, scale, scale);
    ctx.fill();
}

//find the cells number of neighbors
function neighbors(x, y) {
    var number = 0;
    number = (cells[x + 1][y].state === 1) ? number + 1 : number;
    number = (cells[x + 1][y + 1].state === 1) ? number + 1 : number;
    number = (cells[x + 1][y - 1].state === 1) ? number + 1 : number;
    number = (cells[x - 1][y].state === 1) ? number + 1 : number;
    number = (cells[x - 1][y + 1].state === 1) ? number + 1 : number;
    number = (cells[x - 1][y - 1].state === 1) ? number + 1 : number;
    number = (cells[x][y + 1].state === 1) ? number + 1 : number;
    number = (cells[x][y - 1].state === 1) ? number + 1 : number;

    return number;
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

    for (var i = 1; i < cells.length - 1; i++) {
        for (var j = 1; j < cells.length - 1; j++) {
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


// This monster has it's own update and drawing functionality so that it only draws when its finished.
function map() {

    lifeArray = [3, 6, 7, 8];
    continueArray = [3, 4, 6, 7, 8];

    rand();

    var topReached = false;

    while (!topReached) {
        for (var i = 1; i < cells.length - 1; i++) {
            for (var j = 1; j < cells.length - 1; j++) {
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
    for (var i = 0; i < cells.length; i++) {
      for (var j = 0; j < cells.length; j++) {
         ctx.beginPath();
         ctx.fillStyle = "#84B9E3";

         if (cells[i][j].gen >= 2 && cells[i][j].gen <= 10) {
            ctx.beginPath();
            ctx.fillStyle = "#B9E3FF";
         }
         if (cells[i][j].gen >= 11 && cells[i][j].gen <= 27) {
            ctx.beginPath();
            ctx.fillStyle = "#ACD0A5";
         }
         if (cells[i][j].gen >= 28 && cells[i][j].gen <= 52) {
            ctx.beginPath();
            ctx.fillStyle = "#84BF8B";
         }
         if (cells[i][j].gen >= 53 && cells[i][j].gen <= 78) {
            ctx.beginPath();
            ctx.fillStyle = "#0A480D";
         }
         if (cells[i][j].gen >= 79 && cells[i][j].gen <= 105) {
            ctx.beginPath();
            ctx.fillStyle = "#94BF8B";
         }
         if (cells[i][j].gen >= 106 && cells[i][j].gen <= 122) {
            ctx.beginPath();
            ctx.fillStyle = "#D3CA9D";
         }
         if (cells[i][j].gen >= 123 && cells[i][j].gen <= 126) {
            ctx.beginPath();
            ctx.fillStyle = "#C3A76B";
         }
         if (cells[i][j].gen >= 127 && cells[i][j].gen <= 133) {
            ctx.beginPath();
            ctx.fillStyle = "#a5a4a2";
         }
         if (cells[i][j].gen >= 134 && cells[i][j].gen <= 140) {
            ctx.beginPath();
            ctx.fillStyle = "#fff";
         }
         ctx.rect((i-1) * scale, (j-1) * scale, scale, scale);
         ctx.fill();
      }
    }
    setRules();
}
