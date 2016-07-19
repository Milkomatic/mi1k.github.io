/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function cell() {
    this.gen = 0;
    this.buffGen = 0;
    this.state = 0;
    this.buffState = 0;
}

var lifeArray = [];
var continueArray = [];
var timer = null;
var canvas = $("#board").get(0);
var ctx = canvas.getContext("2d");
var scale = 5;
var cells = new Array(500 / scale);


function load() {
    for (var i = 0; i < cells.length; i++) {
        cells[i] = [];
        for (var j = 0; j < cells.length; j++) {
            cells[i][j] = new cell();
        }
    }

    cells[3][3].buffState = 1;
    cells[2][3].buffState = 1;
    cells[1][3].buffState = 1;
    cells[3][2].buffState = 1;
    cells[2][1].buffState = 1;
    cells[3][3].state = 1;
    cells[2][3].state = 1;
    cells[1][3].state = 1;
    cells[3][2].state = 1;
    cells[2][1].state = 1;
    cells[3][3].gen = 1;
    cells[2][3].gen = 1;
    cells[1][3].gen = 1;
    cells[3][2].gen = 1;
    cells[2][1].gen = 1;
    cells[3][3].buffGen = 1;
    cells[2][3].buffGen = 1;
    cells[1][3].buffGen = 1;
    cells[3][2].buffGen = 1;
    cells[2][1].buffGen = 1;

    setRules();
    draw(true);

}



function draw(flag) {
    for (var i = 1; i < cells.length - 1; i++) {
        for (var j = 1; j < cells.length - 1; j++) {

            //Dont want this to run on FindCell
            if (flag) {
                lifeDeath(i, j);
            }
            ctx.beginPath();
            ctx.fillStyle = "#000";

            if (cells[i][j].gen === 1) {
                ctx.beginPath();
                ctx.fillStyle = "#ff0";
            }
            if (cells[i][j].gen === 2) {
                ctx.beginPath();
                ctx.fillStyle = "#f60";
            }
            if (cells[i][j].gen === 3) {
                ctx.beginPath();
                ctx.fillStyle = "#f00";
            }

            ctx.rect(i * scale, j * scale, scale, scale);
            ctx.fill();
        }
    }
}

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


function lifeDeath(x, y) {
    var numNeighbors = neighbors(x, y);
    var cont = false;

    if (cells[x][y].state === 1) {
        for (var j = 0; j < continueArray.length; j++) {
            if (numNeighbors === continueArray[j]) {
                cont = true;
            }
        }
        if (cont === false) {
            cells[x][y].buffState = 0;
            cells[x][y].Buffgen = 0;
        } else if(cells[x][y].gen < 3){
           cells[x][y].Buffgen = cells[x][y].Buffgen + 1;
        }
    } else if (cells[x][y].state === 0) {
        for (var i = 0; i < lifeArray.length; i++) {
            if (numNeighbors === lifeArray[i]) {
                cells[x][y].buffState = 1;
                break;
            }
        }
    }
}

function update() {
    for (var i = 1; i < cells.length - 1; i++) {
        for (var j = 1; j < cells.length - 1; j++) {
            cells[i][j].state = cells[i][j].buffState;
            cells[i][j].gen = cells[i][j].buffGen;

        }
    }
}

function step() {
    update();
    draw(true);
}

$("#play").click(function () {
    if (timer !== null)
        return;
    timer = setInterval(function () {
        step();
    }, $("#speed").val());
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

function findCell(e) {
    var x = Math.floor(e.offsetX / scale);
    var y = Math.floor(e.offsetY / scale);

    if (cells[x][y].buffState === 0) {
        cells[x][y].buffState = 1;
        cells[x][y].gen = 1;
    } else if (cells[x][y].buffState === 1) {
        cells[x][y].buffState = 0;
        cells[x][y].gen = 0;
    }

    cells[x][y].state = cells[x][y].buffState;
    draw(false);
}

function rand() {

    for (var i = 1; i < cells.length - 1; i++) {
        for (var j = 1; j < cells.length - 1; j++) {
            cells[i][j].buffState = 0;
            cells[i][j].state = cells[i][j].buffState;
        }
    }

    for (var i = 1; i < cells.length - 1; i++) {
        for (var j = 1; j < cells.length - 1; j++) {
            cells[i][j].buffState = Math.round(Math.random());
            cells[i][j].state = cells[i][j].buffState;
        }
    }
    draw(false);
}

function clear(){
   for (var i = 1; i < cells.length - 1; i++) {
      for (var j = 1; j < cells.length - 1; j++) {
           cells[i][j].buffState = 0;
           cells[i][j].gen = 0;
           cells[i][j].state = cells[i][j].buffState;
      }
   }
}

function seed() {

    clear();

    for (var i = 45; i < 55; i++) {
        for (var j = 45; j < 55; j++) {
            cells[i][j].buffState = Math.round(Math.random());
            cells[i][j].state = cells[i][j].buffState;
        }
    }
    draw(false);
}

function city() {
    var citySize = Math.floor((Math.random() * 40) + 20);
    var outSize = Math.floor((Math.random() * 50) + 30);

    seed();

    lifeArray = [3];
    continueArray = [2, 3, 4];

    var counter = 0;
    var city = setInterval(function () {
        // do your thing
        step();
        counter++;
        if (counter === citySize) {
            clearInterval(city);
            continueArray = [1, 2, 3, 4, 5, 6, 7, 8];
            counter = 0;
            var out = setInterval(function () {
                // do your thing
                step();
                counter++;
                if (counter === outSize) {
                    clearInterval(out);
                }
            }, 100);
        }
    }, 100);
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


//this is a neat function but it is painfully slow
function country() {
    var citySize = Math.floor((Math.random() * 40) + 20);
    var outSize = Math.floor((Math.random() * 100) + 70);
    var numberOfCities = Math.floor((Math.random() * 10) + 5);
    var locX = 0;
    var locY = 0;


    for (var i = 1; i < cells.length - 1; i++) {
        for (var j = 1; j < cells.length - 1; j++) {
            cells[i][j].buffState = 0;
            cells[i][j].state = cells[i][j].buffState;
        }
    }
    draw(false);

    for (var n = 1; n < numberOfCities; n++) {
        locX = Math.floor((Math.random() * 460) + 30);
        locY = Math.floor((Math.random() * 460) + 30);
        for (var i = locX - 10; i < locX + 10; i++) {
            for (var j = locY - 10; j < locY + 10; j++) {
                cells[i][j].buffState = Math.round(Math.random());
                cells[i][j].state = cells[i][j].buffState;
            }
        }
        draw(false);
    }

    lifeArray = [3];
    continueArray = [2, 3, 4];

    var counter = 0;
    var city = setInterval(function () {
        // do your thing
        step();
        counter++;
        if (counter === citySize) {
            clearInterval(city);
            continueArray = [1, 2, 3, 4, 5, 6, 7, 8];
            counter = 0;
            var out = setInterval(function () {
                // do your thing
                step();
                counter++;
                if (counter === outSize) {
                    clearInterval(out);
                }
            }, 100);
        }
    }, 100);
}
