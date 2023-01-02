const Movie = require("../models/movieModel");

exports.getAllMovies = async (req, res)=> {
    try {
        // BUILD QUERY
        const query = Movie.find(req.query);

        // EXECUTE QUERY
        const movies = await query;

        // SEND RESPONSE
        console.log("Data sent successfully");
        res.status(200).json({
            status: "success",           
            results: movies.length,
            data: {
                movies
            }
        });

    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error
        });
    }
};

exports.createMovie = async (req, res)=> {
    try {
        const newMovie = await Movie.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie
            }
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: "Invalid data send!"
        });
    };
};

exports.getMovie = async (req, res)=> {
    try {
        const movie = await Movie.findOne(req.params.movieId);

        console.log("Data sent successfully");
        res.status(200).json({
            status: "success",
            data: {
                movie
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error
        });
    };
};


exports.updateMovie = async (req, res)=> {
    try {
        const movie = Movie.findOneAndUpdate(req.params.movieId, req.body, {
            new: true,
            runValidators: true
        });

        console.log("Data updated successfully");
        res.status(200).json({
            status: "success",
            data: {
                movie
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error
        });
    };
};


exports.deleteMovie = async (req, res)=> {
    try {
        await Quiz.findOneAndDelete(req.params.movieId);

        console.log("Data deleted successfully");
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error
        });
    };
};

