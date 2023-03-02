// Start of Code


function setup() {
  // creats canvas and main player
  cnv = new Canvas(windowWidth, windowHeight);
  player = new Sprite(300, 200, 50, 50, "d");
  player.shapeColor = color("white");
  player.vel.x = 0;
  walls();
   enemyBots = new Group(); 
  enemy();

  // player movement when key is pressed
  document.addEventListener("keydown", function(event) {
    if (event.code == 'ArrowUp' || event.code == "KeyW") {
      player.vel.y = -5;
    }
   
    else if (event.code == 'ArrowDown' || event.code == "KeyS") {
      player.vel.y = 5;
    }
    else if (event.code == 'ArrowLeft' || event.code == "KeyA") {
      player.vel.x = -5;
    }
    else if (event.code == "ArrowRight" || event.code == "KeyD") {
      player.vel.x = 5;
    }
  })
  
  // player movement reset when key is relased 
  document.addEventListener("keyup", function(event) {

    if (event.code == "ArrowUp" || event.code == "ArrowDown" || event.code == "KeyW" || event.code == "KeyS") {
      player.vel.y = 0;
    }
    else if (event.code == "ArrowLeft" || event.code == "ArrowRight" || event.code == "KeyA" || event.code == "KeyD") {
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


function enemy(){
  // functiion creates the enemys 
  for (i = 0; i < 50; i++){
  enemy1 = new sprite( )
  enemy1.vel.y = 1;
  enemy1.vel.x = 1;
    
    
  }

  
}

function draw() {
  //background for canvas
  background("black");
}

//end of code 
