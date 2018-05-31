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

// Add Movie
router.post('/add', function (req, res) {
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
	res.render('movies');
});

//router.delete('/delete/:id', jsonParser, (req, res) => {
router.post('/delete/', (req, res) => {

 console.log(req.body.id);
 let id = req.body.id;
 
 Movie.remove({ _id : id }, function(err) {
 	if (err)
 		res.send(err);
 	else
 		res.send('Successfully! Movie has been Deleted.'); 
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