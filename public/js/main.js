var socket = io.connect("http://localhost:3000");

var sensorVal = 0;
let slider;

socket.on("prox", function(proximityValue){
	//take value and write it to the object
	sensorVal = proximityValue;
    console.log(sensorVal)
	//send coords value to draw function
	draw(sensorVal)
});



function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    angleMode(DEGREES)

    slider = createSlider(0,255 ,100);
    slider.position(1300, 100);
}

function draw() {
    background(30)

    rotateX(60) 

    noFill()

    strokeWeight(sensorVal/25);

    let blue = slider.value();
    stroke(blue)

    /*fill(255, 204, 0);
    circle(500, 400, gsrVal);*/
    
    console.log(sensorVal)

    for (var i=0; i < 10; i++) {
        beginShape()
        for (var j = 0; j < 360; j += 10) {
            var rad = i * sensorVal/8
            var x = rad * cos(j)
            var y = rad * sin(j)
            var z = sin(frameCount + i * 13) * sensorVal*2

            vertex(x, y, z)
        }
        endShape(CLOSE)
    }
}

