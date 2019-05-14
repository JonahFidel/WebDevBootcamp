var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));


var campgrounds = [
		{
			name: "Salmon Creek", 
			image: "https://media-cdn.tripadvisor.com/media/photo-s/08/99/c4/84/10-shady-lovely-campsites.jpg"
		},
		{
			name: "Granite Creek", 
			image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s615/Campsites.jpg"
		},
		{
			name: "Mountain Goats Rest", 
			image: "https://www.alapark.com/sites/alapark.com/files/styles/large/public/DSPPrimitive.JPG?itok=WYgou76Z"
		},
		{
			name: "Salmon Creek", 
			image: "https://media-cdn.tripadvisor.com/media/photo-s/08/99/c4/84/10-shady-lovely-campsites.jpg"
		},
		{
			name: "Granite Creek", 
			image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s615/Campsites.jpg"
		},
		{
			name: "Mountain Goats Rest", 
			image: "https://www.alapark.com/sites/alapark.com/files/styles/large/public/DSPPrimitive.JPG?itok=WYgou76Z"
		},
		{
			name: "Salmon Creek", 
			image: "https://media-cdn.tripadvisor.com/media/photo-s/08/99/c4/84/10-shady-lovely-campsites.jpg"
		},
		{
			name: "Granite Creek", 
			image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s615/Campsites.jpg"
		},
		{
			name: "Mountain Goats Rest", 
			image: "https://www.alapark.com/sites/alapark.com/files/styles/large/public/DSPPrimitive.JPG?itok=WYgou76Z"
		},
		{
			name: "Salmon Creek", 
			image: "https://media-cdn.tripadvisor.com/media/photo-s/08/99/c4/84/10-shady-lovely-campsites.jpg"
		},
		{
			name: "Granite Creek", 
			image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s615/Campsites.jpg"
		},
		{
			name: "Mountain Goats Rest", 
			image: "https://www.alapark.com/sites/alapark.com/files/styles/large/public/DSPPrimitive.JPG?itok=WYgou76Z"
		}
	];

// set render engine to ejs to allow render routing to ejs template files
app.set("view engine", "ejs");

app.get('/', function(req, res){
	res.render("landing");
});

app.get('/campgrounds', function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
	// get data from form 
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image};
	// add to campgrounds array
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
	res.render("new");
});

// alternate port setup for hosted
// process.env.PORT, process.env.IP
app.listen(8000, function(){
	console.log("The YelpCamp server has started.")
});