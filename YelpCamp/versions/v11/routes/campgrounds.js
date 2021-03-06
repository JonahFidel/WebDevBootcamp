var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get('/', function(req, res){
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
router.post('/', middleware.isLoggedIn, function(req, res){
	// get data from form 
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name, image:image, description: desc, author: author};
	// create a new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to campgrounds page
			console.log(newlyCreated);
			res.redirect('/campgrounds');
		}
	});
});

//NEW - Show form to add new campground
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//SHOW - show additional info about a campground that user clicked on 
router.get('/:id', function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			//render the template with that campground
			res.render("campgrounds/show", {campground: foundCampground})
		}
	});
});

// EDIT -- Edit the campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE -- Update the campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}

	});
});


// DESTROY -- Destroy the campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
		if(err){
			res.redirect("/campgrounds");
		} else {
			Comment.deleteMany( {_id: {$in: campgroundRemoved.comments }}, (err) => {
				if(err){
					console.log(err);
				} 
				res.redirect("/campgrounds");
			});
		}
	});
});

module.exports = router;