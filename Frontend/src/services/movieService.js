import {
    authorizedPostCall,
    authorizedGetCall,
    authorizedPatchCall,
} from "./APIsService";

export const addMovie = async (movie) => {
    return new Promise((resolve, reject) => {
        authorizedPostCall("/movie/add_movie", movie)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

export const updateMovie = async (id, movie) => {
    return new Promise((resolve, reject) => {
        authorizedPatchCall(`/movie/update_movie/${id}`, movie)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

export const getMovies = async (query) => {
    return new Promise((resolve, reject) => {
        authorizedGetCall(query ? `/movie/get_movies` + query : `/movie/get_movies`)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};