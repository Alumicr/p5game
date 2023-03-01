// Start of Code


function setup() {
  cnv = new Canvas(windowWidth, windowHeight);
  player = new Sprite(300, 200, 50, "d");  
  player.shapeColor = color("white");



  walls();

}


function walls() {
  // function makes walls and colours
  wallRH = new Sprite(width, height / 2, 8, height, 'k');
  wallRH.shapeColor = color('white');
  wallLH = new Sprite(0, height / 2, 8, height, 'k');
  wallLH.shapeColor = color('white');
  wallTop = new Sprite(0, 8, width * 2, 8, 'k');
  wallTop.shapeColor = color('white');
  wallBot = new Sprite(width, height + 8, width * 2, 8, 'k');
  wallBot.shapeColor = color('white');

}

function draw() {

  background("black");


}