
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import footer_img from '../../assets/images/footer_img.png';
import './styles.scss';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="not-found-page">
            <div className="not-found-heading">404 Page</div>
            <div className="not-found-sub-heading">O-o-oh! Something broke</div>
            <button className='go-back-btn' onClick={handleGoBack}>Go Back</button>
            <img src={footer_img} alt="Footer" className="footer-img" />
        </div>
    )
}

export default ErrorPage;
