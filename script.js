// Start of Code


function setup() {
  // creats canvas and main player
  cnv = new Canvas(windowWidth, windowHeight);
  player = new Sprite(300, 200, 50, "d");
  player.shapeColor = color("white");
  walls();

  // player movement when key is pressed
  document.addEventListener("keydown", function(event) {
    if (event.code == 'ArrowUp') {
      player.vel.y = -5;
    }
    else if (event.code == 'ArrowDown') {
      player.vel.y = 5;
    }
    else if (event.code == 'ArrowLeft') {
      player.vel.x = -5;
    }
    else if (event.code == "ArrowRight") {
      player.vel.x = 5;
    }
  })
  
  // player movement reset when key is relased 
  document.addEventListener("keyup", function(event) {

    if (event.code == "ArrowUp" || event.code == "ArrowDown") {
      player.vel.y = 0;
    }
    else if (event.code == "ArrowLeft" || event.code == "ArrowRight") {
      player.vel.x = 0;
    }
  })
}

function walls() {
  // function makes walls and sets the colours
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
  //background for canvas
  background("black");


}

//end of code 
