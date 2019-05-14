var express = require('express');
var app = express();

// set render engine to ejs to allow render routing to ejs template files
app.set("view engine", "ejs");

app.get('/', function(req, res){
	res.render("landing");
});

// alternate port setup for hosted
// process.env.PORT, process.env.IP
app.listen(8000, function(){
	console.log("The YelpCamp server has started.")
});