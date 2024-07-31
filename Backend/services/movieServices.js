const movie = require("../models/movie");


const addMovie = async (data) => {

    console.log("In add movie service");
    return new Promise((resolve, reject) => {
        new movie(data)
            .save()
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    });

}

const findMovie = async (condition) => {

    console.log("In find movie service");
    return new Promise((resolve, reject) => {
        movie.findOne(condition)
            .then((user) => resolve(user))
            .catch((err) => reject(err));
    });

}

const updateMovie = async (condition, update, option) => {

    console.log("In update movie service");
    return new Promise((resolve, reject) => {
        movie.findOneAndUpdate(condition, update, option)
            .then((user) => resolve(user))
            .catch((err) => reject(err));
    });

}

const movieAggregate = async (query) => {

    console.log("In movie aggregate service");
    return new Promise((resolve, reject) => {
        movie.aggregate(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });

}

module.exports = {
    addMovie,
    findMovie,
    updateMovie,
    movieAggregate
}