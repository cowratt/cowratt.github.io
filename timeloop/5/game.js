function setup() {
  createCanvas(windowWidth, windowWidth / 2);
  ypos = height - 50
  horizontal_y_pos = ypos
  xpos = width / 2
  default_x_pos = xpos
  yvel = 0
  square_radius = 40
  circle_radius = 25
  rectMode(CENTER)
  falling = false
  lose = false
  baddies = []
  fallingBaddies = []
  colorMode(HSB)
  timeSurvived = 0
  
  moreColors = false
  evenMoreColors = false
  avantGarde = false
  fallingBalls = true
  spawnRate = 0.98
  fallingSpawnRate = 0.99
  fallingRate = 5
  lastFallingBaddyAdded = 0

  lastValid = null
  lastAdded = null
  invuln = 0

  dragon_mouthClosed = loadImage('dragon1.png');
  dragon_mouthOpen = loadImage('assets/dragon2.png');

  drag = new dragon(width*6/8, default_x_pos)
}

function draw() {
  
  if(keyIsDown(LEFT_ARROW)) leftPressed = true
  else leftPressed = false
  if(keyIsDown(RIGHT_ARROW)) rightPressed = true
  else rightPressed = false
  if(keyIsDown(UP_ARROW)) jumpPressed = true
  else jumpPressed = false
  
  
  

  if(lose){
    textSize(50)
    textAlign(CENTER, CENTER)
    fill(200)
   text("u lose mothafacka", width/2, height/2)
    textSize(30)
    text("space 2 rastert", width/2, height*2/3)
    
   if (keyIsPressed){
     setup()
   }
    return
  }
    if(!evenMoreColors)
    background(60)  
    else if (!avantGarde) background(frameCount % 100, 40, 70)  
    lightShow()
    timeSurvived++
    
    
    
  //handle jump
  if(jumpPressed && !falling){
    yvel = -23
    falling = true
  }
  if(falling){
    if(jumpPressed)
    yvel += 1.5
    else yvel += 3.5
    yvel = min(yvel, 25)
    ypos = ypos + yvel
    if (ypos > horizontal_y_pos){
      falling = false
      yvel = 0
      ypos = height - 50
    }
  }

  //invuln
  if (invuln > 0){
    invuln -= 1
  }
  
    
  xpos = default_x_pos
  if(leftPressed) xpos -= 20
  if(rightPressed) xpos += 20
  if(invuln > 0) fill(150,100,80)
  else fill(0,0,100)
  rect(xpos, ypos, square_radius, square_radius);
    
    
  //generate baddies
  if (random() > spawnRate) addFireball()
  if (fallingBalls) if (random() > fallingSpawnRate) addFallingBaddy()

  for (var i = 0; i < baddies.length; i++){
    baddies[i].move()
    baddies[i].draw()
    //check loss
    if (baddies[i].collide(xpos, ypos) && invuln < 1) lose = true
    if(baddies[i].offscreen) baddies.splice(i,1)
  }

  //draw dragon
  drag.draw()
  
}


function addFireball(){
  var addLoc = width
  var theresSpace = false
  if (lastAdded != null){
    if (addLoc - lastAdded.x > square_radius * 2.5){
      theresSpace = true
    }
    else if(addLoc - lastValid.x > square_radius * 5){
      return
    }
  }

  baddies.unshift(new horizontalObstical(width, horizontal_y_pos))
  if(theresSpace || lastValid == null) lastValid = baddies[0]
  lastAdded = baddies[0]
drag.openMouth()

  
}

function addFallingBaddy(){
  if (baddies.length > 6) return
  if (frameCount - lastFallingBaddyAdded > 100){
    lastFallingBaddyAdded = frameCount
    var falling_xpos = default_x_pos - square_radius/2
    if (random() < 0.5) falling_xpos = default_x_pos + square_radius/2
    baddies.unshift(new verticalObstical(falling_xpos, 0))
  }
  

}

function collision(x1,y1,x2,y2,r1,r2){
  if(sqrt(sq(x1 - x2) + sq(y1 - y2)) < (r1 + r2)/2) return true
  return false
}




function lightShow(){
  if(timeSurvived < 350){
  }
  else if(timeSurvived < 550){
    text("You know what this game needs?", width/2, height/2)
    spawnRate = 0.98
  }
  else if (timeSurvived < 700){
    text("More colors", width/2, height/2)
    moreColors = true
  }
  else if (timeSurvived < 900){
    text("kids these days love their fuckin colors", width/2, height/2)
    evenMoreColors = true
  }
  else if (timeSurvived < 1100){
    text("let's get avant garde", width/2, height/2)
    avantGarde = true
    spawnRate = 0.96
  }
  else if (timeSurvived < 1300){
    spawnRate = 0.98
  }
  
  textSize(20)
  text("time Survived: " + timeSurvived, width/8,height/15)
}



class horizontalObstical{
  constructor(x,y){
    this.x = x
    this.y = y
    this.radius = circle_radius
    this.color = color(random(100),100,100)
    this.offscreen = false
    this.type = 1
  }

  draw(){
    if(moreColors) fill(this.color)
    else fill(0,0,100)
    ellipse(this.x, this.y, circle_radius, circle_radius)
    if(this.x < -40) this.offscreen = true
  }
  move(){
    this.x = this.x - 10
  }

  collide(xpos, ypos){
    return (collision(xpos,ypos,this.x,this.y, square_radius,this.radius))
  }

}

class verticalObstical{
  constructor(x,y){
    this.x = x
    this.y = y
    this.xVel = 0
    this.yVel = 5
    this.radius = circle_radius
    this.color = color(random(100),100,100)
    this.offscreen = false
    this.type = 0
  }

  draw(){
    if(moreColors) fill(this.color)
    else fill(0,0,100)
    ellipse(this.x, this.y, circle_radius, circle_radius)
    if(this.y > width + 40) this.offscreen = true
  }

  move(){
    this.y = this.y + this.yVel
    this.x = this.x + this.xVel
  }

  //returns true if the player loses
  collide(xpos, ypos){
    if (collision(xpos,ypos,this.x, this.y, square_radius,this.radius)){
      if (this.y - ypos < this.x - xpos &&  this.y < ypos) return true
      if (invuln > 0) return false
      if(this.y > ypos && yvel > 0){
        this.yVel = 10
        bounce()
      }
      else{
        this.xVel = this.x - xpos
        this.yvel = 4
        invuln = 25
      }
    }
    return false
  }
}

class dragon{
  constructor(x,y){
    this.x = x
    this.y = y
    this.mouthOpenTimer = 0
  }
  draw(){
      if (this.mouthOpenTimer > 0){
        this.dragon_mouthOpenTimer -= 1
        image(dragon_mouthOpen,this.x,this.y)
      }
      else image(dragon_mouthClosed, this.x, this.y)
  }
    
  openMouth(){
    this.dragon_mouthOpenTimer = 20
  }
}

function bounce(){
  if(! invuln > 0){
    yvel = -20
  }
  invuln = 20
}