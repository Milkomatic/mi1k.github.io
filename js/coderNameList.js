var nameList1 = ["coder", "software developer", "cyberpunk", "programmer", "software engineer", "creator", "innovator", "pioneer" , "maker", "technologist"];
var nameList2 = ["coder", "software developer", "programmer", "creator", "hacker", "innovator", "pioneer", "maker", "technologist"];
var nameList3 = ["coder", "software developer", "cyberpunk", "programmer", "hacker", "software engineer", "creator", "designer", "innovator", "pioneer", "maker", "software architect"];
var nameList4 = ["coder", "programmer", "hacker", "software engineer", "creator", "software architect", "innovator", "pioneer", "maker", "technologist", "software developer"];

function generate(){
   shuffle(nameList1)
   shuffle(nameList2)
   shuffle(nameList3)
   shuffle(nameList4)
   $(".coderNameList1").html(nameList1.join(", ") +", <a href=\"automata.html\">automata</a>, " + nameList2.join(", ") + ", <a href=\"#\">source</a>, " + nameList3.join(", ") + ", <a href=\"#\">network</a>, " + nameList4.join(", "));

}

function shuffle(array) {
   var currentIndex = array.length, temporaryValue, randomIndex;
   // While there remain elements to shuffle...
   while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }
   return array;
}
