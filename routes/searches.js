const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//var mongo = require('mongo');
//var mongoose = require('mongoose');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var Movie = require('../models/movie');

router.put('/updates/', (req, res) => {
	console.log('start update...');
	console.log(`id: ${req.params.id}`)
	console.log(`title: ${req.body.title}`)
	Movie.findOneAndUpdate({
		_id:req.params.id
	}, {$set: {title:req.body.title}},
		{upsert:true},
		(err, newMovie) => {
			if(err) {
				console.log(err);
			}
			else {
				res.send(newMovie);
			}
	});
});


router.delete('/delete/:id', (req, res) => {
  console.log('start delete...')
  Movie.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

router.get('/all', (req, res) => {
	console.log('getting all movies...');
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
	console.log('start get by year...')
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

router.post('/add', (req, res) => {
	Movie.create(req.body, (err, movie) => {
		if(err) {
			res.send(err);
		}
		else {
			res.send(movie);
		}
	})
});



/*

router.post('/add', (req, res) => {
	let newMovie = new Movie();

	newMovie.title = req.body.title;
	newMovie.year = req.body.year;
	newMovie.rating = req.body.rating;
	newMovie.description = req.body.description;

	newMovie.save((err, movie) => {
		if(err) {
			res.send(err);
		}
		else {
			res.send(movie);
		}
	})
});

*/



module.exports = router;