var Comment = require("../models/comment");
var Campground = require("../models/campground");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	if (req.isAuthenticated()){
		//does user own the campground
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				res.redirect("back");
			} else {
				if (foundCampground.author.id.equals(req.user._id)){
					next();	
				} else {
					res.redirect("back")
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
	if (req.isAuthenticated()){
		//does user own the campground
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				console.log("first if");
				res.redirect("back");
			} else {
				//does the user own the comment?
				console.log("foundComment.author.id: " + foundComment.author.id);
				console.log("req.user._id: " + req.user._id);
				if (foundComment.author.id.equals(req.user._id)){
					next();	
				} else {
					res.redirect("back")
					console.log("first else");
				}
			}
		});
	} else {
		console.log("second else");
		res.redirect("back");
	}
}

module.exports = middlewareObj;