var express       = require('express'),
bodyParser    = require('body-parser'),
mongoose      = require('mongoose'),
passport      = require('passport'),
LocalStrategy = require('passport-local'),
Campground    = require('./models/campground'),
Comment       = require('./models/comment'),
User          = require('./models/user'),
seedDB        = require('./seeds'),
app           = express();

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
// set render engine to ejs to allow render routing to ejs template files
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "The quick brown fox jumps over the lazy dog",
	resave: false, 
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.get('/', function(req, res){
	res.render("landing");
});

//INDEX - show all campgrounds
app.get('/campgrounds', function(req, res){
	console.log(req.user);
	// get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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

// =========================
// AUTH ROUTES
// =========================

//show the register form 
app.get("/register", function(req, res){
	res.render("register");
});

//signup logic 
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

//show login form 
app.get("/login", function(req, res){
	res.render("login");
});

//handle login logic
app.post('/login', passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
});

//add logout route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

// alternate port setup for hosted
// process.env.PORT, process.env.IP
app.listen(8000, function(){
	console.log("The YelpCamp server has started.")
});