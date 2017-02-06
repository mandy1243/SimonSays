// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}


// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE
		// listen for event - what box 1 is clicked
		socket.on('box1Signal', function(){
			console.log('got box 1 clicked');

			// emit event out to the rest of the clients
			socket.broadcast.emit('box1output');
		});

		socket.on('box2Signal', function(){
			console.log('got box 2 clicked');

			// emit event out to the rest of the clients
			socket.broadcast.emit('box2output');
		});

		socket.on('box3Signal', function(){
			console.log('got box 3 clicked');

			// emit event out to the rest of the clients
			socket.broadcast.emit('box3output');
		});

		socket.on('box4Signal', function(){
			console.log('got box 4 clicked');

			// emit event out to the rest of the clients
			socket.broadcast.emit('box4output');
		});

		// THIS IS WHERE THE PLAYER CLIENT WAS SUCCESSFUL
		socket.on('box1Success', function(){
			console.log('Player successfully clicked box 1!');

			// emit event out to the rest of the clients
			socket.broadcast.emit('box1output');
		});

		socket.on('box2Success', function(){
			console.log('Player successfully clicked box 2!');

			// emit event out to the rest of the clients
			socket.broadcast.emit('box2output');
		});

		socket.on('box3Success', function(){
			console.log('Player successfully clicked box 3!');

			// emit event out to the rest of the clients
			socket.broadcast.emit('box3output');
		});

		socket.on('box4Success', function(){
			console.log('Player successfully clicked box 4!');

			// emit event out to the rest of the clients
			socket.broadcast.emit('box4output');
		});

		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);