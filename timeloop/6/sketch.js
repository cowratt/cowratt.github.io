var p1, p2
var state = 1
var winner = "Use A and L to attack. Hold to defend.\nDon't touch the edges!"

let black_n, black_a, black_d, white_n, white_a, white_d;
function preload() {
  black_n = loadImage('assets/blackskull_neutral_192.png');
  black_a = loadImage('assets/blackskull_attack_192.png');
  black_d = loadImage('assets/blackskull_defend_192.png');
  white_n = loadImage('assets/whiteskull_neutral_192.png');
  white_a = loadImage('assets/whiteskull_attack_192.png');
  white_d = loadImage('assets/whiteskull_defend_192.png', null, (e)=>{console.log(e)});
  
}

function setup() {
  createCanvas(800, 300);
  p1 = new player(width/4,200,2, "Left Wins!", black_n, black_a, black_d)
  p2 = new player(width*3/4,200,-2, "Right Wins!", white_n, white_a, white_d)
  textAlign(CENTER, CENTER)
  rectMode(CENTER)
  textSize(30)
  imageMode(CENTER)
}

function draw() {
  background(100, 100, 100);
  if(state == 0){
    //draw bars
    noStroke()
    fill(255,100,100)
    rect(20, height/2, 40, height)
    rect(width-20, height/2, 40, height)
    //draw characters
    p1.draw()
    p2.draw()
    p1.calcWin(p2)
    p2.calcWin(p1)
  }
  else{
    text(winner, width/2, height/3)
    text("PRESS SPACE TO RESTART", width/2, height*2/3)
    if(keyIsDown(32)){
      setup()
      state = 0
    }
  }
}

function keyPressed(){
  if (key == "a"){
    p1.pressed()
  }
  if (key == "l"){
    p2.pressed()
  }
}

function keyReleased(){
  if (key == "a"){
    p1.released()
  }
  if (key == "l"){
    p2.released()
  }
}
function calcCollision(a, b, width){
  if (a.x) true;
}

class player{
    player_width = 135
    attack_time = 10
    attack_dur = 8
    step_size = 15
  constructor(x, y, dir, name, neutral, attack, defend){
    this.neutral_img = neutral
    this.attack_img = attack
    this.defend_img = defend
    this.active_img = neutral
    this.x = x
    this.y = y
    this.direction = dir
    this.canMove = false
    this.attacking = false
    this.defending = false
    this.name = name
  }
  draw(){
    
    this.timer++
    if(this.timer == this.attack_time && !this.attacking){
      this.defending = true
    }
    if(this.timer == this.attack_time + this.attack_dur && this.attacking) this.attacking = false
    if(this.attacking){
      this.active_img = this.attack_img
      //this.x += this.direction*3
    }
    else if(this.defending){
      this.active_img = this.defend_img
      if(this.timer % 20 == 0)
          this.x -= this.step_size*this.direction/2
    }
    else this.active_img = this.neutral_img
    
    this.x = constrain(this.x, 20, width-20)
    image(this.active_img, this.x, this.y)
  }
  pressed(){
    this.defending = true
    this.attacking = false
    this.timer = 0
  }
  released(){
    this.defending = false
    if(this.timer <= this.attack_time){
      this.attacking = true
      this.x += this.step_size*this.direction
    }
  }
  calcBounce(other){
    if(abs(this.x - other.x) > this.player_width) return
    if(this.attacking && other.attacking){
      //bounce both back
      this.x -= this.step_size*this.direction
      other.x += this.step_size*this.direction
    }
    else if(this.attacking && other.defending){
      //bounce this back
      this.x -= 2*this.step_size*this.direction
    }
  }
  calcWin(other){
    this.calcBounce(other)
    if((abs(this.x - other.x) < this.player_width && this.attacking) || other.x < 90 || other.x > width - 90){
      //win!
      winner = this.name
      state = 1
    }
  }
}