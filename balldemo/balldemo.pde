/*
coded by Conrad Menchine
criticism and pull requests encouraged
(i have no idea how pull requests work, though)
please credit me if you post this anywhere
*/

//--------------------- Setting up non-canvas-dependant variables

boolean started = false;
PVector mouse = new PVector(mouseX, mouseY);
float radius = 40;

ArrayList<Orbital> balls;
Orbital ogb;
float decay = 0.90;
float strength = 0.6;
color bg = #C7D5E8;

boolean sizechange = false;
String sizetext = "off";



//---------------------- Setting up canvas and canvas-dependant variables
void setup(){
    size(500,500);
    background(bg);
    strokeWeight(1);
    textSize(15);
    frameRate(60);
    colorMode(HSB, 360, 100, 100);
    window.addEventListener("resize", myResize, false);
    balls = new ArrayList<Orbital>();
    balls.add(new Orbital(color(random(360), random(70,100), random(80,100)), 1));
    ogb = (Orbital) balls.get(0);

    
    for(int i = 0;i < 4; i++){
        balls.add(new Orbital(color(random(360), random(70,90), random(70,90)), 0.9));
    }
}




//------------------------- The draw function: shows splash screen and program
void draw(){

program();
}

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

void program(){
    textSize(min(width,height)/26);
    if( mousePressed){
        background(bg);
    }
    mouse.set(mouseX, mouseY);
    stroke(0);
    ogb.orbit(mouse);
    /*
    Orbital previous = ogb;
    for(Orbital b : balls) {
      b.orbit(previous.position);
      previous = b;
    }
    */

    for(int i=1; i<balls.size();i++){
        Orbital b = balls.get(i);
        Orbital b0 = balls.get(i-1);
        b.orbit(b0.position);
    }

}
void myResize(){
    if(window.innerWidth < 700) resizeCanvas(300,300);
    else resizeCanvas(500,500);
}
void resizeCanvas(int newWidth, int newHeight) {
  size(newWidth, newHeight);
  redraw();  // not needed if frameRate is high enough
}

class Orbital {
    PVector position = new PVector(0,0);
    PVector velocity = new PVector(0,0);
    PVector tempvel = new PVector(0,0);
    //Don't judge. I use the other spelling to differentiate between the class and the private object
    color colour;
    float delay;
    float mult;
    
    Orbital(color doot, float mul) {
        colour = doot;
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
        fill(colour);
        if(sizechange){
        radius = max(15, min(70, (velocity.mag()) / 20));}
        else{radius = 40;}
        ellipse(position.x, position.y, radius, radius);
    }
}