var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var passportLocalMongoose = require("passport-local-mongoose");


var userData = [
	{
		username: "Jack",
		salt: "f268e6716f1332ab39f2c68f7a43033cb66b3c9f9d679ee2328191ad97e70682",
		hash: "fcd77b16c36f080a46b8465ccd76bfa6a94b2ec728a8d5b4a927e0dc60ff0517500f45c7ba6ee74c8bed54e1c850a397d40a0790aeb5665c65b945daf52def56b47cfbbffce0c3465db2ffbc292ce9948a09566bd563d4285dae35fc5fa408295e76ce10aae5053ebcb513e0c45fae73fbb22338b2642ee9cf8e16b086b25cdace7639403a9be9fc6f07d5963f66b06b952c3865304a6b53772fad42f705ab39e4757ba75c353af0aa1e3134a60192a9ca4edce8bb85cd7cc6801b8e6a3900dbdfd042ba47fde57a9bf10c055c3ffc8fbcf3c72dae2fd26ebc94a3aa453fb7215540e88ad890319de6a361ca88186462769413781fcaf564b72e1bc98950d8a22d874f25ff5ebc40ee733f122153a6fc5db4cfa87ce368982a350365d364e8165482a7fd135839a4fa669b6b63027ead8690e81a11d3936c0cd4a86e366a97dc7a5186d49cac09f87a67e47db6db34ede7ed4c7e4df9074dd526773552937fcfdaf95f1d702a6654a003a4add5a7a00e48f31117c8fcaa8ef9a93769f05c4880751e11c669f17fb8da0a1d60374bcf32ac43aedad700874eb9238fda17017215b75b2086764aeab68e7071ca321559b3d2de8641652e97f78b490ba6b5d4f43203ca5d55f5fe96a26a1ce4477c9df00d62642e4c4a00036cb818f5997087877a3cdaec956895d44f9c77006267e1a7b3cbba0e6bf5630f186a5d9a4e7f799592",
		_id: "5ce5daee1bdff21bea673419"
	},
	{
		username: "Jill",
		salt: "f268e6716f1332ab39f2c68f7a43033cb66b3c9f9d679ee2328191ad97e70682",
		hash: "fcd77b16c36f080a46b8465ccd76bfa6a94b2ec728a8d5b4a927e0dc60ff0517500f45c7ba6ee74c8bed54e1c850a397d40a0790aeb5665c65b945daf52def56b47cfbbffce0c3465db2ffbc292ce9948a09566bd563d4285dae35fc5fa408295e76ce10aae5053ebcb513e0c45fae73fbb22338b2642ee9cf8e16b086b25cdace7639403a9be9fc6f07d5963f66b06b952c3865304a6b53772fad42f705ab39e4757ba75c353af0aa1e3134a60192a9ca4edce8bb85cd7cc6801b8e6a3900dbdfd042ba47fde57a9bf10c055c3ffc8fbcf3c72dae2fd26ebc94a3aa453fb7215540e88ad890319de6a361ca88186462769413781fcaf564b72e1bc98950d8a22d874f25ff5ebc40ee733f122153a6fc5db4cfa87ce368982a350365d364e8165482a7fd135839a4fa669b6b63027ead8690e81a11d3936c0cd4a86e366a97dc7a5186d49cac09f87a67e47db6db34ede7ed4c7e4df9074dd526773552937fcfdaf95f1d702a6654a003a4add5a7a00e48f31117c8fcaa8ef9a93769f05c4880751e11c669f17fb8da0a1d60374bcf32ac43aedad700874eb9238fda17017215b75b2086764aeab68e7071ca321559b3d2de8641652e97f78b490ba6b5d4f43203ca5d55f5fe96a26a1ce4477c9df00d62642e4c4a00036cb818f5997087877a3cdaec956895d44f9c77006267e1a7b3cbba0e6bf5630f186a5d9a4e7f799592",
		_id: "5ce5daee1bdff21bea673420"
	},
	{
		username: "James",
		salt: "f268e6716f1332ab39f2c68f7a43033cb66b3c9f9d679ee2328191ad97e70682",
		hash: "fcd77b16c36f080a46b8465ccd76bfa6a94b2ec728a8d5b4a927e0dc60ff0517500f45c7ba6ee74c8bed54e1c850a397d40a0790aeb5665c65b945daf52def56b47cfbbffce0c3465db2ffbc292ce9948a09566bd563d4285dae35fc5fa408295e76ce10aae5053ebcb513e0c45fae73fbb22338b2642ee9cf8e16b086b25cdace7639403a9be9fc6f07d5963f66b06b952c3865304a6b53772fad42f705ab39e4757ba75c353af0aa1e3134a60192a9ca4edce8bb85cd7cc6801b8e6a3900dbdfd042ba47fde57a9bf10c055c3ffc8fbcf3c72dae2fd26ebc94a3aa453fb7215540e88ad890319de6a361ca88186462769413781fcaf564b72e1bc98950d8a22d874f25ff5ebc40ee733f122153a6fc5db4cfa87ce368982a350365d364e8165482a7fd135839a4fa669b6b63027ead8690e81a11d3936c0cd4a86e366a97dc7a5186d49cac09f87a67e47db6db34ede7ed4c7e4df9074dd526773552937fcfdaf95f1d702a6654a003a4add5a7a00e48f31117c8fcaa8ef9a93769f05c4880751e11c669f17fb8da0a1d60374bcf32ac43aedad700874eb9238fda17017215b75b2086764aeab68e7071ca321559b3d2de8641652e97f78b490ba6b5d4f43203ca5d55f5fe96a26a1ce4477c9df00d62642e4c4a00036cb818f5997087877a3cdaec956895d44f9c77006267e1a7b3cbba0e6bf5630f186a5d9a4e7f799592",
		_id: "5ce5daee1bdff21bea673421"
	},
];

var campgroundData = [
	{
		name: "Cloud's Rest", 
		price: "100.23",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9IeLI9QQKsXtFv89Zf8MOcwTBStrXdILYtEhPDawS-vxM6W-0jw",
		description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
		author: {
			id: "5ce5daee1bdff21bea673419",
			username: "Jack"
		}
	},
	{
		name: "Desert Mesa",
		price: "13.98",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKGLxR7kd12iau98dcSwINr2uEFrBQ_9-O3SNPRfN1foO90wzpcA",
		description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
		author: {
			id: '5ce5daee1bdff21bea673420',
			username: "Jill"
		}
	},
	{
		name: "Canyon Floor",
		price: "18.39",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGvT8liYZ_jEoDvrXNB0vomEGyaQ6OvViFW8cKYS4LVt1ZVmgm",
		description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
		author: {
			id: '5ce5daee1bdff21bea673421',
			username: "James"
		}
	}
];

function seedDB(){
	User.deleteMany({}, (err) => {
		if(err){
			console.log(err);
		}
		console.log("Removed Users!");
		// add a few users
		userData.forEach(function(seed){
			User.create(seed, function(err, user){
				if(err){
					console.log(err);
				} else {
					console.log("added a user");
				}
			});
		});
	});
	// Remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed Campgrounds!");
		// add a few campgrounds
		campgroundData.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground");
					//create a comment
					Comment.create({
						text: "This place is great but I wish there was internet",
						author: {
							id: "5ce5daee1bdff21bea673419",
							username: "Jack"
						}
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
}

module.exports = seedDB;
