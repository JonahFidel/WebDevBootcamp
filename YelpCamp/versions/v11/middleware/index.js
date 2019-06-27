var Comment = require("../models/comment");
var Campground = require("../models/campground");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that!");
	res.redirect('/login');
}

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	if (req.isAuthenticated()){
		//does user own the campground
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found.");
				res.redirect("back");
			} else {
				if (foundCampground.author.id.equals(req.user._id)){
					next();	
				} else {
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back")
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that!");
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
					req.flash("error", "You don't have permission to do that!");
					res.redirect("back");
				}
			}
		});
	} else {
			req.flash("error", "You need to be logged in to do that.")
			res.redirect("back");
	}
}

module.exports = middlewareObj;