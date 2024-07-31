import React from 'react';
import { useNavigate } from 'react-router-dom';
const { VITE_BASE_URL_BACKEND } = import.meta.env;


const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const imageUrl = movie?.poster?.url ? `${VITE_BASE_URL_BACKEND}${movie.poster.url}` : '';
    const handleEditMovie = () => {
        navigate('/movie', { state: { id: movie._id, movie } });
    }

    return (
        <div className='movie-card' onClick={handleEditMovie}>
            <div className='movie-image-container'>
                <img src={imageUrl} alt={movie?.title} />
            </div>
            <div className='card-text'>
                <div className='movie-title'>{movie?.title}</div>
                <div className='movie-year'>{movie?.publishYear}</div>
            </div>
        </div>
    );
};

export default MovieCard;