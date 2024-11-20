

import React, { useState } from "react";
import './LoginForm.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Crear el objeto con los datos del formulario
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/login",
                { username, password },
                { withCredentials: true }  // Required to include session cookies
            );
            // Check if response and response.data exist
            if (response && response.data) {
                setMessage(response.data.message);

                sessionStorage.setItem("isLoggedIn", true);
                sessionStorage.setItem("role", response.data.role);
                sessionStorage.setItem("username", response.data.username);

                if (response.data.role === 'Cliente') {
                    window.location.href = "/pantallaclientes/menucliente.html";
                }
                else if (response.data.role === 'Empleado') {
                    navigate('componentesMenu/MenuAdmin')
                }
            } else {
                setMessage("Unexpected response format.");
            }

            setMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || "Login failed");
            } else {
                setMessage("Network error or no response from server.");
            }
        }
    };

    return (
        <div className="wrapper">
            <div className="left-side">
            <h2 className="info-text">Track your workouts, and manage your fitness goals—all in one place.</h2>
                <div className="form-container">
                
                    <form onSubmit={handleLogin}>
                        <h1 className="title">Welcome to Gyms</h1>
                        <div>
                            <input
                                className="input"
                                placeholder="Username"
                                value={username}
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                className="input"
                                placeholder="Password"
                                type="password"
                                spellCheck="false"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className="forgot-password">
                            <span className="page-link-label">Forgot your password?</span>
                        </p>
                        <button type="submit" className="form-btn">Log in</button>
                    </form>
                    <p>{message}</p>
                </div>
                
            </div>

            <div className="right-side">
               
            </div>
        </div>
    );
}
export default Login