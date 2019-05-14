var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send("This will be the landing page soon");
});

app.listen(8000, function(){
	console.log("The YelpCamp server has started.")
});