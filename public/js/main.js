var socket = io.connect("http://localhost:3000");

var gsrVal = 0;

socket.on("prox", function(proximityValue){
	//take value and write it to the object
	gsrVal = proximityValue;
    console.log(gsrVal)
	//send coords value to draw function
	draw(gsrVal)
});



function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    angleMode(DEGREES)
}

function draw() {
    background(30)

    rotateX(60) 

    noFill()
    stroke(255)

    /*fill(255, 204, 0);
    circle(500, 400, gsrVal);*/
    
    console.log(gsrVal)

    for (var i=0; i < 10; i++) {
        beginShape()
        for (var j = 0; j < 360; j += 10) {
            var rad = i * 5
            var x = rad * cos(j)
            var y = rad * sin(j)
            var z = sin(frameCount + i * 13) * gsrVal

            vertex(x, y, z)
        }
        endShape(CLOSE)
    }
}

