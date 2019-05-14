var express    = require('express'),
bodyParser = require('body-parser')
mongoose   = require('mongoose'),
app        = express();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image :String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 			name: "Salmon Creek", 
// 			image: "https://media-cdn.tripadvisor.com/media/photo-s/08/99/c4/84/10-shady-lovely-campsites.jpg"
// 		}, function(err, campground){
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				console.log("Newly created campground: ");
// 				console.log(campground);
// 			}
// 		});

// var campgrounds = [
// {
// 	name: "Salmon Creek", 
// 	image: "https://media-cdn.tripadvisor.com/media/photo-s/08/99/c4/84/10-shady-lovely-campsites.jpg"
// },
// {
// 	name: "Granite Creek", 
// 	image: "https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s615/Campsites.jpg"
// },
// {
// 	name: "Mountain Goats Rest", 
// 	image: "https://www.alapark.com/sites/alapark.com/files/styles/large/public/DSPPrimitive.JPG?itok=WYgou76Z"
// }
// ];

// set render engine to ejs to allow render routing to ejs template files
app.set("view engine", "ejs");

app.get('/', function(req, res){
	res.render("landing");
});

app.get('/campgrounds', function(req, res){
	// res.render("campgrounds", {campgrounds: campgrounds});

	// get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
});

app.post('/campgrounds', function(req, res){
	// get data from form 
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, image:image};
	// create a new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/new', function(req, res){
	res.render("new");
});

// alternate port setup for hosted
// process.env.PORT, process.env.IP
app.listen(8000, function(){
	console.log("The YelpCamp server has started.")
});