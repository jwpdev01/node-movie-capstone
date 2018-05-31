var express = require('express');
var router = express.Router();

var Movie = require('../models/movie');

// Get Homepage
router.get('/', function(req, res){
	res.render('movies');
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

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking movie title and year are already taken
		Movie.findOne({ title: { 
			"$regex": "^" + title + "\\b", "$options": "i"
	}}, function (err, movie) {
			Movie.findOne({ movie: { 
				"$regex": "^" + movie + "\\b", "$options": "i"
		}}, function (err, year) {
				if (title || year) {
					res.render('/', {
						title: title,
						year: year,
						rating: rating,
						description: description
					});
				}
				else {
					var newMovie = new Movie({
						title: title,
						year: year,
						rating, rating,
						description: description
					});
					newMovie.save();
					/*User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});*/
         	req.flash('success_msg', 'Movie Updated');
					res.redirect('/movies');
				}
			});
		});
	}
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;