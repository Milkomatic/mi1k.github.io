var stepsPerCheck = 10;
var fitness = 8; //8 max
var fitMargin = .75; //75% aka 6
var fitTracker = [-1];
var fitRules = [];
var rule = Math.floor((Math.random() * 16) + 1);

function learn(){
   rand();
   clearRules();
   readRules();

   rule++;
   if (rule > 16) {
      rule = 1;
   }
   while (fitRules.includes(rule)) {
      rule++;
   }
   changeRule(rule);
   var avgStepFit = fitStep();
   fitTracker.push(avgStepFit);
   if (avgStepFit > fitTracker[fitTracker.length - 2]){
      fitRules.push(rule);
   }
}

function readRules(){
   for (var i = 0; i < fitRules.length; i++) {
      changeRule(fitRules[i]);
   }
}

function getFit(){
   var iterFit = 0;
   for (var i = 1; i < cells.length - 1; i++) {
      for (var j = 1; j < cells.length - 1; j++) {
         iterFit += parseInt(neighbors(i, j), 10);
         //iterFit += cells[i][j].gen;
      }
   }
   return iterFit / (cells.length * cells.length);
   //return iterFit / liveCells();
}

function liveCells(){
   var totalLive = 0;
   for (var i = 1; i < cells.length - 1; i++) {
      for (var j = 1; j < cells.length - 1; j++) {
         totalLive += cells[i][j].state;
      }
   }
   return totalLive;
}

function fitStep() {
   var totalFitArr = []
   for (var i = 0; i < stepsPerCheck; i++) {
      step();
      totalFitArr.push(getFit());
   }

   var sumFit = 0;
   for (var j = 0; j < totalFitArr.length; j++){
      sumFit += parseInt(totalFitArr[j], 10);
   }
   avgFit = sumFit / totalFitArr.length;
   return avgFit;
}

function changeRule(rule) {
   switch (rule) {
      case 1:
         $("#l1").prop('checked', true);
         break;
      case 2:
         $("#l2").prop('checked', true);
         break;
      case 3:
         $("#l3").prop('checked', true);
         break;
      case 4:
         $("#l4").prop('checked', true);
         break;
      case 5:
         $("#l5").prop('checked', true);
         break;
      case 6:
         $("#l6").prop('checked', true);
         break;
      case 7:
         $("#l7").prop('checked', true);
         break;
      case 8:
         $("#l8").prop('checked', true);
         break;
      case 9:
         $("#d1").prop('checked', true);
         break;
      case 10:
         $("#d2").prop('checked', true);
         break;
      case 11:
         $("#d3").prop('checked', true);
         break;
      case 12:
         $("#d4").prop('checked', true);
         break;
      case 13:
         $("#d5").prop('checked', true);
         break;
      case 14:
         $("#d6").prop('checked', true);
         break;
      case 15:
         $("#d7").prop('checked', true);
         break;
      case 16:
         $("#d8").prop('checked', true);
         break;
      default:
   }
   setRules();
   return rule;
}

function clearRules(){
   $("#l1").prop('checked', false);
   $("#l2").prop('checked', false);
   $("#l3").prop('checked', false);
   $("#l4").prop('checked', false);
   $("#l5").prop('checked', false);
   $("#l6").prop('checked', false);
   $("#l7").prop('checked', false);
   $("#l8").prop('checked', false);
   $("#d1").prop('checked', false);
   $("#d2").prop('checked', false);
   $("#d3").prop('checked', false);
   $("#d4").prop('checked', false);
   $("#d5").prop('checked', false);
   $("#d6").prop('checked', false);
   $("#d7").prop('checked', false);
   $("#d8").prop('checked', false);
   setRules();
}
