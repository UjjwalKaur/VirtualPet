var dog, happyDog, dogImage, happyDogImage;
var database;
var foodS, foodStack;

function preload()
{
  dogImage = loadImage("Dog.png");
  happyDogImage = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,40,50);
  dog.addImage(dogImage);
  dog.scale = 0.3;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  drawSprites();
  
  textSize(20);
  fill("turquoise");
  stroke(0);
  text("Food remaining "+foodS, 250,50);

  textSize(10);
  fill(0);
  stroke(0);
  text("Press UP_ARROW to feed milk", 50,50);

}

function readStock(data){
  foodS = data.val();
  
}

function writeStock(x){

  if(x <= 0){
    x=0;
  } else {
    x = x -1;
  }

  database.ref('/').update({
    Food:x
  })
}




