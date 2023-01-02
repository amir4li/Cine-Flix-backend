const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: [true, "Please provide a movie id"]
    },
    watched: {
        type: Boolean
    },
    myRating: {
        type: Number
    },
    myReview: {
        type: String
    }
});


const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

