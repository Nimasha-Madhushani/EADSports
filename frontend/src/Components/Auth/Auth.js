import axios from "axios";
import React, { useState } from "react";
import "./AuthStyles.css";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
    const [userInput, setUserInput] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();
    const location = useLocation();
    const [rightSide, setRightSide] = useState(location.state?.login);

  const changeToSignUp = () => {
    console.log("sign in");
    setRightSide(true);
  };
  const changeToSignIn = () => {
    console.log("sign up");
    setRightSide(false);
  };
  const clearUserInputs = () => {
    setUserInput({
      firstName: "",
      lastName: "",
      username : "",
      email: "",
      password: "",
    });
  };
// add comment
  const handleChange = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };
  const handleRegister = (event) => {
    event.preventDefault();
    console.log(userInput);
    axios
      .post("http://localhost:8080/auth/register", userInput)
      .then((res) => {
        console.log(res);
        clearUserInputs();
        window.alert(res.data.message);
        setRightSide(true);
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(userInput);
    axios
      .post("http://localhost:8080/auth/login", userInput)
      .then((res) => {
        console.log(res);
        clearUserInputs();
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("token", JSON.stringify(res.data.token));
        setUser(res.data.user);
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.message);
      });
  };
  console.log(location)

  return (
    <>
      <div className="blur1" />
      <div className="blur2" />
      <div className="page-content">
        {/* <div className="homeIcon">
          <a href="/">
            <i className="fas fa-arrow-left" />
          </a>
        </div> */}
        <div
          className={rightSide ? "container" : "container right-panel-active"}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form>
              <h1>Create Account</h1>
              <div className="social-container">
                <div className="social">
                  <i className="fab fa-facebook-f" />
                </div>
                <div className="social">
                  <i className="fab fa-google-plus-g" />
                </div>
                <div className="social">
                  <i className="fab fa-linkedin-in" />
                </div>
              </div>
              <span>or use your email for registration</span>
              <div className="names">
              <input
                type="text"
                value={userInput.firstName}
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
              />
              <input
                type="text"
                value={userInput.lastName}
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
              />


              </div>
              <input
                type="text"
                value={userInput.username}
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <input
                type="email"
                value={userInput.email}
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                type="password"
                value={userInput.password}
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <button onClick={handleRegister}>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form>
              <h1>Sign in</h1>
              <div className="social-container">
                <div className="social">
                  <i className="fab fa-facebook-f" />
                </div>
                <div className="social">
                  <i className="fab fa-google-plus-g" />
                </div>
                <div className="social">
                  <i className="fab fa-linkedin-in" />
                </div>
              </div>
              <span>or use your account</span>
              <input
                type="text"
                value={userInput.username}
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <input
                type="password"
                value={userInput.password}
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <a href="#ty">Forgot your password?</a>
              <button onClick={handleLogin}>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn" onClick={changeToSignUp}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp" onClick={changeToSignIn}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="view-blog-text">

        <a href="/home">View blogs without registering</a>
        </div>
      </div>
    </>
  );
};

export default Auth;