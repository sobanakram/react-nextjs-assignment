import React, { useLayoutEffect, useState } from 'react';
import addIcon from '../../assets/images/add_icon.svg';
import logoutIcon from '../../assets/images/logout.svg';
import footer_img from '../../assets/images/footer_img.png';
import './styles.scss';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../../services/movieService';
import MovieCard from './components/MovieCard';

const MoviesListingPage = ({ setUser, setAccessToken }) => {
    const navigate = useNavigate();
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [movies, setMovies] = useState([]);

    useLayoutEffect(() => {
        getMovies(`?pageNo=${pageNo}`)
            .then((data) => {
                if (data?.movies?.length === 0 || !data?.movies) {
                    navigate('/empty_view');
                } else {
                    setMovies(data?.movies);
                    setPageNo(data?.meta?.current_page);
                    setTotalPages(data?.meta?.total_pages);
                }
            })
            .catch((error) => {
                console.log(error);
                window.alert(error?.response?.data?.error || "Something went wrong");
            });
    }, [pageNo]);

    const handlePrevPage = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1);
        }
    }

    const handleNextPage = () => {
        if (pageNo < totalPages) {
            setPageNo(pageNo + 1);
        }
    }

    const handleLogout = () => {
        logout()
            .then((data) => {
                localStorage.clear("user");
                localStorage.clear("access_token");
                setAccessToken(null);
                setUser(null);
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
                window.alert(error?.response?.data?.error || "Something went wrong");
            });
    }

    const handleAddMovies = () => {
        navigate('/movie');
    }

    return (
        <div className='movie-list-container'>
            <header>
                <div className='left-side' onClick={handleAddMovies}>
                    <div className='my-movies-heading'>My Movies</div>
                    <div>
                        <img src={addIcon} alt='add-icon' className='add-icon' />
                    </div>
                </div>
                <div className='right-side' onClick={handleLogout}>
                    <div className='logout'>Logout</div>
                    <div>
                        <img src={logoutIcon} alt='logout-icon' className='logoutIcon' />
                    </div>
                </div>
            </header>
            <div className='grid-container'>
                {movies?.map((movie) => (
                    <MovieCard key={movie?._id} movie={movie} />
                ))}
            </div>
            <div className="pagination">
                <button
                    className={`prev-btn ${pageNo === 1 && 'in-active'}`}
                    onClick={handlePrevPage}
                    disabled={pageNo === 1}
                >
                    Prev
                </button>
                {[...Array(totalPages)]?.map((_, index) => (
                    <button
                        key={index}
                        className={`page-no ${pageNo === index + 1 ? 'active' : ''}`}
                        onClick={() => setPageNo(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className={`next-btn ${pageNo === totalPages && 'in-active'}`}
                    onClick={handleNextPage}
                    disabled={pageNo === totalPages}
                >
                    Next
                </button>
            </div>
            <img src={footer_img} alt="Footer" className="footer-img" />
        </div>
    );
};

export default MoviesListingPage;
