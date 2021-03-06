ArrayList<fallingCharacter> matrix = new ArrayList<fallingCharacter>();
void setup(){
    textSize(30);
    size(500,500);
    for(int i = 0; i < width/20; i++){
        matrix.add(new fallingCharacter());
    }
    fill(#0CAA15);
    rect(-1, -1, width+1, height+1);
    frameRate(20);
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
    fill(#0F0F0F, 10);
    rect(-1, -1, width+1, height+1);
    fill(#0CAA15);
    for (fallingCharacter i : matrix){
        i.comeDown();        
    }
}

class fallingCharacter{
    float X = 0;
    float Y = 0;
    fallingCharacter(){
        Y = random(height);
        X = random(width);
    }
    void comeDown(){
        Y+= random(3,20);

        text(randomchar(),X, Y);
        if(Y > height){
            Y = 0;
            X = random(width);
        }
    }
}
String randomchar(){
    String s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={}[]:;\'<>?,./|\\";
    String x = "" + s.charAt(int(random(68)));
    return x;
}