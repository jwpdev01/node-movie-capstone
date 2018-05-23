var express = require('express');
var router = express.Router();
//var mongo = require('mongo');
//var mongoose = require('mongoose');

var Movie = require('../models/movie');

router.get('/all', (req, res) => {
	console.log('geting all movies...');
	Movie.find({})
		.exec(function(err, books) {
			if(err) {
				res.send('error as occured');
			}
			else {
				console.log(books);
				res.json(books);
			}
		});
});


router.get('/byYear/:year', (req, res) => {
	Movie.find({
		year:req.params.year
	})
	.exec(function(err, movie) {
		if(err) {
			res.send('error finding movie by year');
		}
		else {
			res.json(movie);
		}
	})
});

router.get('/byTitle/:title', (req, res) => {
	Movie.findOne({
		title:req.params.title
	})
	.exec(function(err, movie) {
		if(err) {
			res.send('error finding movie by title');
		}
		else {
			res.json(movie);
		}
	})
});


router.post('/movie-add', (req, res) => {
		let newMovie = new Movie({			
			title: req.body.title,
			year: req.body.year,
			rating: req.body.rating,
			description: req.body.description
		});
		
		Movie.createMovie(newMovie, function (err, user) {
						if (err) throw err;
						console.log(Movie);
					});
	});

/*function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}*/

module.exports = router;