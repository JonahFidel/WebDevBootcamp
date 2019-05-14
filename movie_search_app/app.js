const express = require('express');
const request = require('request');
const app = express();
app.set("view engine", "ejs");

app.get('/', function(req, res){
	res.render("search");
});

app.get('/results', function(req, res){
	var query = req.query.search;
	var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + query;
	request(url, function(error, response, body){
		if(!error && response.statusCode === 200){
			var data = JSON.parse(body);
			// res.send(results.Search[0].Title);
			res.render("results", {data: data});
		}
	});
});

app.listen(8000, function(){
	console.log("Movie app has started!");
});