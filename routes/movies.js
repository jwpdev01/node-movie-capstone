var express = require('express');
var router = express.Router();

var Movie = require('../models/movie');

// Get Homepage
router.get('/', function(req, res){
	res.render('movies');
});

router.get('/all', (req, res) => {
	console.log('getting all movies...');
	Movie.find({})
		.exec(function(err, movies) {
			if(err) {
				res.send('error as occured');
			}
			else {
				//console.log(books);
				//res.json(movies);
				//res.render('index')
				res.render('results',{movies_list: movies})
			}
		});
});

router.post('/search/', ensureAuthenticated, function(req, res){
	 console.log('search one');
	let id = req.body.id;
	console.log(`search one.  id value is ${id}`)
	console.log(id);
	Movie.findById({ _id : id }, 
		function (err, movie) {
			if(err) {
				res.send(err);
			}
			else {
				res.render('results',{
					_id1: movie._id,
					title1 : movie.title,
					year1: movie.year,
					rating1: movie.rating
					})
			}
	});
});

// Add Movie
router.post('/add', function (req, res) {

if (req.body._id1 == "") {
	console.log('new movie')	
	let title = req.body.title;
	let year = req.body.year;
	let rating = req.body.rating;
	let description = req.body.description;

	// Validation
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('year', 'Year is required').notEmpty();
	req.checkBody('rating', 'Rating is required').notEmpty();
	req.checkBody('description', 'Description is required').notEmpty();
	
	var errors = req.validationErrors();

	const newMovie = new Movie(req.body);
	newMovie.save();
	//res.render('results');
	res.redirect('/');
	}
else {
	console.log(`id1 value is ${req.body._id1}`);
	Movie.findOneAndUpdate({
		_id:req.body._id1
		}, {$set: {title:req.body.title}},
			{upsert:true},
		(err, newMovie) => {
			if(err) {
				console.log(err);
			}
			else {
				//res.send(newMovie);
				//res.redirect('movies/');
				//res.render('movies');
				res.redirect('/');
			}
		});
		//res.redirect('/');
	}
	//res.redirect('/');
});

//router.delete('/delete/:id', jsonParser, (req, res) => {
router.post('/delete/', (req, res) => {

 console.log(req.body.id);
 let id = req.body.id;
      
 Movie.remove({ _id : id }, function(err) {
 	if (err)
 		res.send(err);
 	else
 		//res.send('Successfully! Movie has been Deleted.'); 
 		res.redirect('/');
 	}); 
})

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/all', (req, res) => {
	console.log('getting all movies...');
	Movie.find({})
		.exec(function(err, movies) {
			if(err) {
				res.send('error as occured');
			}
			else {
				//console.log(books);
				res.json(movies);
				//res.render('index')
			}
		});
});

module.exports = router;