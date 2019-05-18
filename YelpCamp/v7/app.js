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

//requiring routes
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");

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

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// alternate port setup for hosted
// process.env.PORT, process.env.IP
app.listen(8000, function(){
	console.log("The YelpCamp server has started.")
});