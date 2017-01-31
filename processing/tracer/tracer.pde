color stroke1, stroke2, stroke3, stroke4, stroke5 = color(0);
float help = 1;
boolean bg = true;
void setup(){
    size(500,500, P3D);
    rectMode(CENTER);
    noFill();
    stroke(0);
    strokeWeight(3);
    //strokeCap(PROJECT);
    colorMode(HSB, 100, 255, 255);
    
        stroke1 = color(random(100), 240, 240);
    stroke2 = color(random(100), 240, 240);
    stroke3 = color(random(100), 240, 240);
    stroke4 = color(random(100), 240, 240);
    stroke5 = color(random(100), 240, 240);
    myResize();
        window.addEventListener("resize", myResize, false);
 
}

void myResize(){
    if(window.innerWidth > 1200){ resizeCanvas(500,500); return;}
    if(window.innerWidth > 600){ resizeCanvas(450,450); return;}
    else resizeCanvas(300,300);
}
void resizeCanvas(int newWidth, int newHeight) {
  size(newWidth, newHeight);
  redraw();  // not needed if frameRate is high enough
}

void draw(){
    if(bg) background(20);
    translate(width/2, height/2);
    
    stroke(stroke1);
    rotateX(sin(frameCount / 100.0)* PI*help);
    rotateY(cos(frameCount / 100.0)* PI*help);
    box(40, 40, 40);
        
    stroke(stroke2);
    rotateZ(sin(frameCount / 100.0 + 50)* PI);
    rotateX(cos(frameCount / 100.0 + 50)* PI);
    box(120,120,120);
    
    stroke(stroke3);
    rotateY(sin(frameCount / 100.0 + 120)* PI);
    rotateZ(cos(frameCount / 100.0 + 120)* PI);
    box(200,200,200);
    if(width > 400){
    stroke(stroke4);
    rotateY(sin(frameCount / 100.0 + 160)* PI);
    rotateZ(cos(frameCount / 100.0 + 160)* PI);
    box(280,280,280);
    }
}

void keyPressed(){
    stroke1 = color(random(100), 240, 240);
    stroke2 = color(random(100), 240, 240);
    stroke3 = color(random(100), 240, 240);
    stroke4 = color(random(100), 240, 240);
    stroke5 = color(random(100), 240, 240);

}
void mouseReleased(){
    //float cameraZ = ((height/2.0) / tan(PI*60.0/360.0));
    //perspective(PI/3.0, width/height, cameraZ*10.0, cameraZ/10.0);
    //help = 1;
    bg = true;
}
void mousePressed(){
    //ortho();
    //help = -1;
    bg = false;
}