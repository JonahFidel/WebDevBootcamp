var express    = require('express'),
	bodyParser = require('body-parser'),
	mongoose   = require('mongoose'),
	Campground = require('./models/campground'),
	Comment    = require('./models/comment'),
	seedDB     = require('./seeds'),
	app        = express();

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
// set render engine to ejs to allow render routing to ejs template files
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get('/campgrounds', function(req, res){
	// res.render("campgrounds", {campgrounds: campgrounds});

	// get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

//CREATE - add new campground to database
app.post('/campgrounds', function(req, res){
	// get data from form 
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description: desc};
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

//NEW - Show form to add new campground
app.get('/campgrounds/new', function(req, res){
	res.render("campgrounds/new");
});

//SHOW - show additional info about a campground that user clicked on 
app.get('/campgrounds/:id', function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			//render the template with that campground
			res.render("campgrounds/show", {campground: foundCampground})
		}
	});
	//find the campground with provided ID 
	//something
});

// =========================
// COMMENTS ROUTES
// =========================
app.get("/campgrounds/:id/comments/new", function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res){
	//lookup campground using id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.ridirect("/campgrounds");
		} else {
			//create new comment
			Comment.create(req.body.comment, function(err, comment){
				if (err){
					console.log(err);
				} else {
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					//redirect campground show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
})

// alternate port setup for hosted
// process.env.PORT, process.env.IP
app.listen(8000, function(){
	console.log("The YelpCamp server has started.")
});