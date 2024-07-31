import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/Authentication/LoginPage';
import MoviesListingPage from './pages/MoviesListingPage';
import EmptyViewPage from './pages/MoviesListingPage/components/EmptyView/EmptyView';
import AddMoviePage from './pages/AddMoviePage';

export default function App() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [user, setUser] = useState(localStorage.getItem('user'));

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const user = localStorage.getItem('user');
        setAccessToken(token);
        setUser(user);
    }, []);

    if (!accessToken || !user) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage setUser={(usr) => { setUser(usr) }} setAccessToken={(token) => { setAccessToken(token) }} />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/movies_listing" element={<MoviesListingPage setUser={(usr) => { setUser(usr) }} setAccessToken={(token) => { setAccessToken(token) }} />} />
                <Route path="/empty_view" element={<EmptyViewPage setUser={(usr) => { setUser(usr) }} setAccessToken={(token) => { setAccessToken(token) }} />} />
                <Route path="/movie" element={<AddMoviePage />} />
                <Route path="*" element={<Navigate to="/movies_listing" />} />
            </Routes>
        );
    }
}
