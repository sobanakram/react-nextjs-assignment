const movieServices = require('../services/movieServices');
const fs = require('fs');
const { default: mongoose } = require('mongoose');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { constants } = require('../shared/contants')

const addMovie = async (request, response) => {
    try {
        const user = request.user;
        const { title, publishYear } = request.body;
        const poster = request.file;

        if (!title || !publishYear || !poster) {
            return response
                .status(422)
                .send({
                    error: 'Required fields are missing'
                });
        }

        let imagePath;
        let uniqueFileName;

        uniqueFileName = `${uuidv4()}_${poster.originalname}`;
        const uploadDirectory = path.join(__dirname, '..', 'public');

        // Save the image to the specified folder
        imagePath = path.join(uploadDirectory, uniqueFileName);
        fs.writeFileSync(imagePath, poster.buffer);

        await movieServices.addMovie({
            user_id: user?._id,
            title,
            publishYear,
            poster: {
                url: `${'/' + uniqueFileName}`,
                contentType: poster?.mimetype,
                fileName: poster?.originalname
            }
        });

        return response
            .status(200)
            .json({
                message: "movie added successfully"
            });

    } catch (error) {
        console.log('Error', error);
        return response
            .status(500)
            .send({
                error: error?.message ? error.message : 'Something went wrong',
            });
    }
};

const updateMovie = async (request, response) => {
    try {
        const id = request?.params?.id;
        const user = request.user;
        let { title, publishYear } = request.body;
        const poster = request.file;

        console.log({ id, title, publishYear, poster });

        if (!title || !publishYear || !id) {
            return response
                .status(422)
                .send({
                    error: 'Required fields are missing'
                });
        }

        let imagePath;
        let uniqueFileName;

        if (poster) {
            uniqueFileName = `${uuidv4()}_${poster.originalname}`;
            const uploadDirectory = path.join(__dirname, '..', 'public');

            // Save the image to the specified folder
            imagePath = path.join(uploadDirectory, uniqueFileName);
            fs.writeFileSync(imagePath, poster.buffer);
        }

        const updatedMovie = await movieServices.updateMovie(
            {
                _id: new mongoose.Types.ObjectId(id),
                user_id: user?._id
            },
            {
                title,
                publishYear,
                ...(poster && {
                    poster: {
                        url: `${'/' + uniqueFileName}`,
                        contentType: poster?.mimetype,
                        fileName: poster?.originalname
                    }
                })
            },
            {
                new: true
            }
        );

        if (!updatedMovie) {
            return response
                .status(400)
                .send({
                    error: 'You are not authorized for this action'
                });
        }

        console.log({ updatedMovie });

        return response
            .status(200)
            .json({
                message: "movie updated successfully"
            });

    } catch (error) {
        console.log('Error', error);
        return response
            .status(500)
            .send({
                error: error?.message ? error.message : 'Something went wrong',
            });
    }
};

const getMovies = async (request, response) => {
    try {
        const user = request.user;
        let { pageNo } = request.query;
        if (pageNo) pageNo = Number(pageNo);
        if (!pageNo) pageNo = 1;

        const query = [
            {
                $match: {
                    user_id: user?._id
                }
            },
            {
                $sort: {
                    createdAt: 1,
                },
            },
            {
                $facet: {
                    meta: [{ $count: 'total' }],
                    data: [{ $skip: (pageNo - 1) * constants.RESULT_PER_PAGE }, { $limit: constants.RESULT_PER_PAGE }],
                },
            },
        ];

        const movies = await movieServices.movieAggregate(query);


        const meta = {
            current_page: parseInt(pageNo),
            total_pages: Math.ceil(movies[0]?.meta[0]?.total / constants.RESULT_PER_PAGE),
            total_count: movies[0]?.meta[0]?.total,
            per_page: constants.RESULT_PER_PAGE,
        };

        return response
            .status(200)
            .json({
                meta,
                movies: movies[0]?.data || []
            });

    } catch (error) {
        console.log('Error', error);
        return response
            .status(500)
            .send({
                error: error?.message ? error.message : 'Something went wrong',
            });
    }
};

module.exports = {
    addMovie,
    updateMovie,
    getMovies
};
