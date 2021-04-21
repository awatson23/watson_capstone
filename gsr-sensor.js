//Fire up our node express server
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname + '/public'));

http.listen(3000, function(){
    console.log("Server is running on port:3000")
});

//Get our Arduino Board and Johnny-Five doing its thing
const { Board, Proximity } = require("johnny-five");
const board = new Board();

/*i tried creating this project with two proximity sensors but it became extra janky sounding so i stuck with one*/

board.on("ready", () => {
  const proximity = new Proximity({
    controller: "HCSR04",
    pin: 7,
    /* i consider the frequency setting to be the 'BPM' of your homely homemade 'theremin'. 
     * I found 250 to be easy to play with and control */
    /*freq: 250   */
  });
 	
	proximity.on("change", function(){
		const {centimeters, inches} = proximity;
		console.log(this.centimeters);
		io.sockets.emit('prox', this.centimeters);
	});	

});

