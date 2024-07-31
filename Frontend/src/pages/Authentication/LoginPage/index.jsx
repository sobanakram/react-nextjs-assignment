import React, { useLayoutEffect, useState } from "react";
import footer_img from '../../../assets/images/footer_img.png';
import './styles.scss';
import { PASSWORD_REGEX } from "../../../constants";
import { isLoggedIn, login } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser, setAccessToken }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    useLayoutEffect(() => {
        if (isLoggedIn()) {
            navigate("/movies_listing");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            window.alert("Email and Password required.");
            return;
        }

        if (password.length < 8) {
            window.alert("Password Must be 8 characters long.");
            return;
        }

        if (!password.match(PASSWORD_REGEX)) {
            toast.error(
                "Password must contain atleast 8 characters and must contain numbers, symbols and alphabets."
            );
        }

        login(email, password)
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data?.user));
                localStorage.setItem('access_token', data?.access_token);
                setAccessToken(data?.access_token);
                setUser(data?.user);

                if (rememberMe) {
                    // localStorage.setItem('access_token',data?.access_token)
                }
                navigate("/movies_listing");
            })
            .catch((error) => {
                console.log(error);
                window.alert(error?.response?.data?.error || "Something went wrong");
            });
    };

    return (
        <div className="signin-container">
            <div className="signin-sub-container">
                <div className="signin_heading">Sign In</div>
                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <button type="submit" className="signin-button">Sign In</button>
                </form>
            </div>
            <img src={footer_img} alt="Footer" className="footer-img" />
        </div>
    )
}

export default LoginPage;
