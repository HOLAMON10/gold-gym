import React from "react";
import './LoginForm.css'

const LoginFrom = () => {
    return (
        <div className="wrapper">
            <form>
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
                                <input placeholder="Email" id="email"></input>
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
                                <input id= "password"placeholder="Password" type="password" spellCheck="false" ></input>
                                
                            </div>
                        </span>
                    </fieldset>
                    <p class="forgot-password">Forgot your password?</p>
                </div>
                <div id="button-box">
                    <button>Log in</button>
                </div>
                <div id="terms-container">
                    <div id='termofservic'>By Continuing, you agree to Gyms <div id="term">Terms of Service</div></div>
                </div>
            </form>
        </div>
    );
}
export default LoginFrom