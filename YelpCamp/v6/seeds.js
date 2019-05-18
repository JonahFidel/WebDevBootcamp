var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
{
	name: "Cloud's Rest", 
	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9IeLI9QQKsXtFv89Zf8MOcwTBStrXdILYtEhPDawS-vxM6W-0jw",
	description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
},
{
	name: "Desert Mesa", 
	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKGLxR7kd12iau98dcSwINr2uEFrBQ_9-O3SNPRfN1foO90wzpcA",
	description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
},
{
	name: "Canyon Floor", 
	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGvT8liYZ_jEoDvrXNB0vomEGyaQ6OvViFW8cKYS4LVt1ZVmgm",
	description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
}
]
function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed Campgrounds!");
		// add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground");
					//create a comment
					Comment.create({
						text: "This place is great but I wish there was internet",
						author: "Homer"
					}, 
					function(err, comment){
						if (err){
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("Created new comment.");
						}
					});
				}
			});
		});
	});
	// add a few comments
}

module.exports = seedDB;
