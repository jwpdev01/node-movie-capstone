var mongoose = require('mongoose');


// User Schema
var MovieSchema = mongoose.Schema({
	title: {
		type: String,
		index:true
	},
	year: {
		type: String
	},
	rating: {
		type: String
	},
	description: {
		type: String
	}
});

var Movie = mongoose.model('Movie', MovieSchema);




module.exports.createMovie = function(newMovie, callback) {
	title = "dead pool" //newMovie.movieTitle;
	year = "2018" //newMovie.year;
	rating = "R" //newMovie.rating;
	description = "deadpool" //newMovie.description;
	newMovie.save(callback)
}

module.exports.getMovieByTitle = function(title){
	console.log(`title ${title}`);
	Movie.find();	
	console.log(Movie.find());
}

//MovieSchema.getMovie.serialize

/*module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}*/