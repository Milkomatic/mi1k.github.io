/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function cell(y) {
    this.y = y;
    this.state = 0;
}
;

var cells = new Array(2500);

function loadOne() {
    var yy = 0;
    for (var i = 0; i < cells.length; i++) {
        cells[i] = new cell();

        if (i % 50 === 0) {
            yy++;
        }
        cells[i].y = yy;
    }
    cells[15].state = 1;
}

function loadTwo() {
    var xx = 0;

    for (var i = 0; i < cells.length; i++) {
        var c = document.getElementById("board");
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "blue";

        if (cells[i].state === 1) {
            ctx.beginPath();
            ctx.fillStyle = "black";
        }

        xx++;
        if (i % 50 === 0) {
            xx = 0;
        }

        ctx.rect(xx * 5, cells[i].y * 5, 5, 5);
        ctx.fill();

    }
}

function loadOne() {
    var yy = 0;
    for (var i = 0; i < cells.length; i++) {
        cells[i] = [];
        for (var j = 0; j < cells.length; j++) {
            cells[i][j] = new cell();
        }
    }
    cells[15][15].state = 1;
}