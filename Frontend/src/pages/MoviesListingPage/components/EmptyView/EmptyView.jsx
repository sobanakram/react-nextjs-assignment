import React, { useEffect } from "react";
import footer_img from '../../../../assets/images/footer_img.png';
import './styles.scss';
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../../../services/movieService";
import logoutIcon from '../../../../assets/images/logout.svg';
import { logout } from "../../../../services/authService";

const EmptyViewPage = ({ setUser, setAccessToken }) => {
    const navigate = useNavigate();
    const createMovie = () => {
        navigate('/movie');
    };

    const handleLogout = () => {
        logout()
            .then(() => {
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
    useEffect(() => {
        getMovies()
            .then((data) => {
                if (data?.movies?.length) {
                    navigate('/movies_listing');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="empty-view-container">
            <div className="empty-view-heading">Your movie list is empty</div>
            <button onClick={createMovie} className="add-movie-btn">Add a new movie</button>
            <button onClick={handleLogout} className="logout-btn">Logout<img src={logoutIcon} alt="log-out" /></button>
            <img src={footer_img} alt="Footer" className="footer-img" />
        </div>
    )
}

export default EmptyViewPage;
