/*
written by Conrad Menchine
criticism and pull requests encouraged
*/

//--------------------- Setting up non-canvas-dependant variables

boolean started = false;
PVector mouse = new PVector(width/2, height/2);
float radius = 40;

ArrayList<Orbital> balls;
Orbital ogb;
float decay = 0.90;
float strength = 0.6;
color bg = #C7D5E8;



float amp = 0;
int loopVal = 240;
int nextReset = loopVal;

//---------------------- Setting up canvas and canvas-dependant variables
void setup(){
    size(500,500);
    
    background(bg);
    strokeWeight(1);
    textSize(15);
    frameRate(60);
    colorMode(HSB, 360, 100, 100);

    balls = new ArrayList<Orbital>();
    balls.add(new Orbital(color(random(360), random(70,100), random(80,100)), 1));
    ogb = (Orbital) balls.get(0);

    
    for(int i = 0;i < 4; i++){
        balls.add(new Orbital(color(random(360), random(70,90), random(70,90)), 0.9));
    }
    //These are required to allow for resizing

    myResize();
    window.addEventListener("resize", myResize, false);

}




//------------------------- The draw function: runs every frame
void draw(){
  //draws the background (clears the screen) when the mouse is pressed
  if( mousePressed){
      background(bg);
  }
  //Treats the mouse as a vector, and has the first circle in the chain orbit it. If the mouse isn't on the screen, plays a demo
  if(mouseX == 0 && mouseY == 0){
      amp = 80* sin((frameCount % loopVal) * PI / loopVal);
      mouse.set(amp*sin((frameCount % 30) * PI / 15) + width/2, amp*cos((frameCount % 30) * PI / 15) + height/2);
      if(nextReset < frameCount){
          keyPressed();
          nextReset = frameCount + loopVal;
      }
      //ellipse(mouse.x, mouse.y, 20, 20);
  }
  else mouse.set(mouseX, mouseY);
  stroke(0);
  ogb.orbit(mouse);
  //has each ball in the rest of the chain orbit the ball ahead of it
  for(int i=1; i<balls.size();i++){
      Orbital b = balls.get(i);
      Orbital b0 = balls.get(i-1);
      b.orbit(b0.position);
  }
}

//when a key is pressed, deletes all of the balls and generates a new set with random colors
void keyPressed(){
    for(int i = 0;i < 5; i++){
        balls.remove(0);
    }
    balls.add(new Orbital(color(random(360), random(70,100), random(80,100)), 1));
    ogb = (Orbital) balls.get(0);
    for(int i = 0;i < 4; i++){
        balls.add(new Orbital(color(random(360), random(70,100), random(80,100)), 0.9));
    }   
}


//this defines what every circle/ball is, and allows them to be quickly replicated
class Orbital {
    PVector position = new PVector(width/2,height/2);
    PVector velocity = new PVector(-90,0);
    PVector tempvel = new PVector(0,0);
    
    color ballColor;
    float delay;
    float mult;
    
    Orbital(color c, float mul) {
        ballColor = c;
        mult = mul;
    }
    void orbit(PVector follow){
        delay = decay;
        if(keyPressed){
            delay = 1;
        }
        follow.set(follow);
        velocity.x = (follow.x - position.x + velocity.x) * delay * mult;
        velocity.y = (follow.y - position.y + velocity.y) * delay * mult;
        tempvel.set(velocity);
        tempvel.mult(0.1*strength);
        position.add(tempvel);
        fill(ballColor);
                    radius = 40;
            ellipse(position.x, position.y, radius, radius);
    }
}

//These are required to make the web version resizable

void myResize(){
    if(window.innerWidth > 1200){ resizeCanvas(500,500); return;}
    if(window.innerWidth > 600){ resizeCanvas(450,450); return;}
    else resizeCanvas(300,300);
}
void resizeCanvas(int newWidth, int newHeight) {
  size(newWidth, newHeight);
  redraw();
}