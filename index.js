const tileImgs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
let tilesFlipped = [];
let tilesMatch = [];


Array.prototype.doubleShuffle = function()
{
    let d;
    for(d = 0; d < this.length; d = d+2){
        this.splice(d+1,0, this[d]);
    }

    let i = (this.length), j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
    return this;
}


function drawBoard(event) {         
  event.preventDefault();
  welcome.style.display = 'none'; 
  board.style.display = 'flex';
  let gameTiles = playGame.level.value;
  let gameTileImgs = tileImgs.slice(0, gameTiles/2);
  gameTileImgs = gameTileImgs.doubleShuffle();
  for (i=0; i<playGame.level.value; i++) {
    let content = '';
    content += '<section class="tile" data-tile="'+i+'">';
    content += '<div class="front"></div>';
    content += '<div class="back">'+gameTileImgs[i]+'</div>';
    content += '</section>';
    board.innerHTML += content;
  }
  return false;
}

function endOfGame() {
  if(board.getElementsByClassName('tile').length == board.getElementsByClassName('flipped').length)
 {
    //alert('tillykke! du fandt alle stikkene!')
   document.getElementById('message').classList.add('show')}
          }

function newGame () {
  board.innerHTML = '';
  board.style.display = 'none'; 
  welcome.style.display = 'flex';
  message.classList.remove('show');
}

function flipBack(){
  console.log(tilesFlipped)
  var allTiles = board.getElementsByClassName('tile');
  allTiles[parseInt(tilesFlipped[0])].classList.remove('flipped');
  allTiles[parseInt(tilesFlipped[1])].classList.remove('flipped');
  tilesFlipped = [];
  tilesMatch = [];
  document.getElementById('board').style.pointerEvents='auto';
}
function twoTiles(){
  console.log(tilesFlipped.length >= 2);
  if(tilesFlipped.length>=2) {
    document.getElementById('board').style.pointerEvents='none';
    if(tilesMatch[0] == tilesMatch[1]) {
  var allTiles = board.getElementsByClassName('tile');
  allTiles[parseInt(tilesFlipped[0])].classList.add('reward');
  allTiles[parseInt(tilesFlipped[1])].classList.add('reward');
  tilesFlipped = [];
  tilesMatch = [];
  setTimeout(endOfGame,500);
  document.getElementById('board').style.pointerEvents = 'auto';
}else {
  setTimeout(flipBack, 1200);
}
}
}
  function flipTile(klikket) {
    if(klikket.target !== klikket.currentTarget){
      if(!klikket.target.parentNode.classList.contains('flipped')) {
      klikket.target.parentNode.classList.add('flipped');
      tilesFlipped.push(klikket.target.parentNode.getAttribute('data-tile'));
      tilesMatch.push(klikket.target.nextElementSibling.innerHTML);
      console.log(tilesFlipped);
      console.log(tilesMatch);
      twoTiles();
      }
    }
  }
    

function dontMove(event) {
  event.preventDefault();
}

playGame.addEventListener("submit", drawBoard, false);
board.addEventListener("click", flipTile, false);
document.body.addEventListener('touchmove', dontMove, false);
message.getElementsByTagName('button')[0].addEventListener("click", newGame, false);