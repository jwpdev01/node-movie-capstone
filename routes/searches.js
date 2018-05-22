var express = require('express');
var router = express.Router();
//var mongo = require('mongo');
//var mongoose = require('mongoose');

var Movie = require('../models/movie');


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

router.get('/movie-search', (req, res) => {
	console.log('start router get');
	//Movie.findOne({title:"Black Panther"});	
	//Movie.getMovieByTitle('Black Panther 2');
	//Movie.findOne('Black Panther');

	
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