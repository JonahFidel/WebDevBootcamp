var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
// this is breaking my app for some reason
// expressSanitizer = require("express-sanitizer"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(expressSanitizer);
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String, 
	image: String,
	body: String, 
	created: {type:Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// TEST OBJECT
// Blog.create({
// 	title: "test blog",
// 	image: "https://images.unsplash.com/photo-1553531384-411a247ccd73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
// 	body: "hello, this is a blog post!"
// });

// RESTFUL ROUTES
app.get('/', function(req, res){
	res.redirect('/blogs');
});

// INDEX ROUTE
app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if (err){
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	})
});

// NEW ROUTE
app.get('/blogs/new', function(req, res){
	res.render("new");
});

// CREATE ROUTE
app.post('/blogs', function(req, res){
	// console.log(req.body);
	// req.body.blog.body = req.sanitize(req.body.blog.body);
	// console.log(req.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render('new');
		} else {
			res.redirect('/blogs');
		}
	});
	//then, redirect to the index
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	})
});

// EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect('/blogs');
		} else {
			res.render('edit', {blog: foundBlog});
		}
	});	
});

// UPDATE ROUTE
app.put('/blogs/:id', function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if (err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete('/blogs/:id', function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(8000, function(){
	console.log("SERVER IS RUNNING! ");
});