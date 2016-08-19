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

var lifeArray = [3, 6, 7, 8];
var continueArray = [3, 4, 6, 7, 8];
var timer = null;
var canvas = $("#board").get(0);
var ctx = canvas.getContext("2d");
var scale = 4
var cells = new Array((600 / scale)+2);
var topReached = false;

function load() {
   for (var i = 0; i < cells.length; i++) {
      cells[i] = [];
      for (var j = 0; j < cells.length; j++) {
         cells[i][j] = new cell();
      }
   }
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

         if (cells[i][j].gen === 140) {
            topReached = true;
         }
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
            //  cells[x][y].buffGen = cells[x][y].buffGen + 1;
            //  if (cells[x][y].buffGen === 7){
            //     cells[x][y].buffGen = 1;
            //  }
            if (cells[x][y].buffGen !== 140){
               cells[x][y].buffGen = cells[x][y].buffGen + 1;
            }
         }
      }
      if (cont === false) {
         cells[x][y].buffState = 0;
         cells[x][y].buffGen = 0;
      }
   } else if (cells[x][y].state === 0) {
      for (var i = 0; i < lifeArray.length; i++) {
         if (numNeighbors === lifeArray[i]) {
            cells[x][y].buffState = 1;
            cells[x][y].buffGen = 1;
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

function playMap(){
   lifeArray = [3, 6, 7, 8];
   continueArray = [3, 4, 6, 7, 8];

   while (!topReached) {
      update();
      draw(true);
   }
}

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

   clear();

   for (var i = 1; i < cells.length - 1; i++) {
      for (var j = 1; j < cells.length - 1; j++) {
         var state = Math.round(Math.random());
         cells[i][j].buffState = state;
         cells[i][j].buffGen = state;
         cells[i][j].state = cells[i][j].buffState;
         cells[i][j].gen = cells[i][j].buffGen;
      }
   }
   draw(false);
}

function clear(){
   for (var i = 1; i < cells.length - 1; i++) {
      for (var j = 1; j < cells.length - 1; j++) {
         cells[i][j].buffState = 0;
         cells[i][j].state = 0;
         cells[i][j].buffGen = 0;
         cells[i][j].gen = 0;
      }
   }
}

function map(){

   rand();

   var topReached = false;

   while (!topReached){
      update();
      for (var i = 1; i < cells.length - 1; i++) {
         for (var j = 1; j < cells.length - 1; j++) {
            lifeDeath(i, j);
            if (cells[i][j].gen === 140){
               update();
               draw();
               topReached = true;
            }
         }
      }
   }
}

function poles(){
   for (var i = 1; i < cells.length - 1; i++) {
      for (var j = 1; j < cells.length - 1; j++) {
         if (j < 15 || j > cells.length - 15 ){
            if( cells[i][j].state === 1 ) {
               ctx.beginPath();
               ctx.fillStyle = "#a5e4b2";
               ctx.rect((i-1) * scale, (j-1) * scale, scale, scale);
               ctx.fill();
            } else {
               ctx.beginPath();
               ctx.fillStyle = "#f5f4f2";
               ctx.rect((i-1) * scale, (j-1) * scale, scale, scale);
               ctx.fill();
            }
         }
      }
   }
}
