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
                const {message,role} = response.data
                console.log("Role:", role)
                if (role ==='Cliente'){
                    window.location.href = "/pantallaclientes/menucliente.html";
                }
                else if (role ==='Empleado'){
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
            <form onSubmit={handleLogin}>
                <h1 id="welcome-login">Welcome to Gyms</h1>
                <div>
                    <label className="">
                        <div>Email</div>
                    </label>
                </div>
                <div>
                    <fieldset id="email-box">
                        <span>
                            <div>
                                <input placeholder="Usuario" value={username}  type="text" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </span>
                    </fieldset>
                </div>
                <div>
                    <label className="">
                        <div>Password</div>
                    </label>
                </div>
                <div>
                    <fieldset id="password-box">
                        <span>
                            <div>
                                <input placeholder="Password" type="password" spellCheck="false"  value={password} onChange={(e) => setPassword(e.target.value)} />

                            </div>
                        </span>
                    </fieldset>
                    <p class="forgot-password">Forgot your password?</p>
                </div>
                <div id="button-box">
                    <button type="submit">Log in</button>
                </div>
                <div id="terms-container">
                    <div id='termofservic'>By Continuing, you agree to Gyms <div id="term">Terms of Service</div></div>
                </div>
            </form>
            <p>{message}</p>
        </div>
    );
}
export default Login