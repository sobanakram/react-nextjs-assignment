import React, { useLayoutEffect, useState } from "react";
import footer_img from '../../assets/images/footer_img.png';
import dropIcon from '../../assets/images/drop.png';
import './styles.scss';
import { MIN_FILE_SIZE } from "../../constants";
import { getBase64 } from "../../services/utilities";
import { useNavigate, useLocation } from "react-router-dom";
import { addMovie, updateMovie } from "../../services/movieService";
const { VITE_BASE_URL_BACKEND } = import.meta.env;

const AddMoviePage = () => {
    const { state } = useLocation();
    const [poster, setPoster] = useState();
    const [posterImage, setPosterImage] = useState();
    const [title, setTitle] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (state && state.movie) {
            const { movie } = state;
            setTitle(movie.title);
            setPublishYear(movie.publishYear);
            setPosterImage(movie.poster.url ? `${VITE_BASE_URL_BACKEND}${movie.poster.url}` : '');
        }
    }, [state]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!title || !publishYear) {
            window.alert("Required data is missing");
            return;
        }

        if (!state?.id && !poster) {
            window.alert("Required data is missing");
            return;
        }

        console.log({ poster, title, publishYear });

        const formData = new FormData();
        if (poster) formData.append("image", poster);
        formData.append("title", title);
        formData.append("publishYear", publishYear);

        const apiCall = state?.id ? updateMovie(state.id, formData) : addMovie(formData);

        apiCall
            .then((data) => {
                navigate('/movies_listing');
            })
            .catch((error) => {
                window.alert(error?.response?.data?.error || "Error Occurred");
            });
    };

    const handleCancel = () => {
        navigate('/movies_listing');
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile?.size >= MIN_FILE_SIZE) {
            window.alert("File Size should be less than 5MB");
            return;
        }
        const file = await getBase64(selectedFile);
        setPosterImage(file);
        if (file) {
            setPoster(selectedFile);
        }
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile?.size >= MIN_FILE_SIZE) {
            window.alert("File Size should be less than 5MB");
            return;
        }
        const file = await getBase64(selectedFile);
        setPosterImage(file);
        if (file) {
            setPoster(selectedFile);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="new-movie-container">
            <div className="new-movie-heading">{state?.id ? "Edit" : "Create a new Movie"}</div>
            <div className="movie-content">
                <div
                    className="file-picker"
                    role="button"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{
                        border: "2px dashed #ccc",
                        borderRadius: "5px",
                        padding: "25px",
                        textAlign: "center",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                    onClick={() => document.getElementById("file-input").click()}
                >
                    {posterImage && (
                        <div className="movie-image-container">
                            <img src={posterImage} alt="" className="movie-image" />
                        </div>
                    )}
                    <div className="text-and-icon">
                        <img className="drop-img" src={dropIcon} alt="drop-icon" />
                        <div className="drop-text">
                            Browse file or drop an image here
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="file-input"
                        />
                    </div>
                </div>

                <div className="form">
                    <div className="form-group">
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div className="form-group publish-year">
                        <input
                            type="text"
                            id="publishYear"
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            placeholder="Publishing Year"
                            required
                        />
                    </div>
                    <div className="buttons-container">
                        <button onClick={handleCancel} className="button cancel-button">Cancel</button>
                        <button onClick={handleSubmit} className="button submit-button">{state?.id ? "Update" : "Submit"}</button>
                    </div>
                </div>
            </div>
            <img src={footer_img} alt="Footer" className="footer-img" />
        </div>
    );
}

export default AddMoviePage;
