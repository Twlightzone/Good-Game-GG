const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;
var bubble;
var bubbleIMG;
var Self;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;
var mobile;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubbleIMG = loadImage('bubu.png')

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{

  mobile=/iPhone|iPad|Android|iPod/i.test(navigator.userAgent)
  if (mobile) {
    canW=displayWidth
    canH=displayHeight 
    createCanvas(canW+80,canH);
  } else 
  {
   canW=windowWidth
   canH=windowHeight
   createCanvas(canW,canH); 
  }

 
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //btn 2
  button2 = createImg('cut_btn.png')
  button2.position(30,600)
  button2.size(50,50);
  button2.mouseClicked(drop2);

  //btn 3
  button3 = createImg('cut_btn.png')
  button3.position(490,380);
  button3.size(50,50)
  button3.mouseClicked(drop3)

  //mute
  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  
  //rope
  rope = new Rope(10,{x:40,y:30});
  rope2 = new Rope(10,{x:40,y:610});
  rope3 = new Rope(10,{x:500,y:390});
  
  //self
  Self = new Ground(690,860,200,20)
  
  //ground
  ground = new Ground(200,canH,600,20);
  
  //anime
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  
  //buddy i mean bunny
  bunny = createSprite(690,790,100,100);
  bunny.scale = 0.2;

  //anime nerd for bunny
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);



  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,canW+80,canH);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();


  Engine.update(engine);
  ground.show();
  Self.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
   
  }

  if(fruit!=null && fruit.position.y>=900)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
 
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}
function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
}
function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 
}




function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}



