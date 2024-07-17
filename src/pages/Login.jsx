import React, { useState } from "react";
import axios from "axios"
import {useCookies} from 'react-cookie'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const [emailID, setemailID] = useState("");

  const [password, setpassword] = useState("");

  const [cookie,setCookie]= useCookies(["access_token"])

  const nav = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const result = await axios.post("https://insta-post-backend-api.onrender.com/login",{
          emailID:emailID,
          password:password
        })
        if (result.data.message === "User not Found") {
          alert("User not Found");
        } else if (result.data.message === "Invalid Credentials") {
          alert("Invalid Credentials");
        } else {
          alert("Successfully logged in");
          nav("/");
          setCookie("access_token", result.data.tokenValue);
          window.localStorage.setItem("userID", result.data.userID);
          window.localStorage.setItem("userName", result.data.userName);
          window.localStorage.setItem("userImg", result.data.userImg);
          window.localStorage.setItem("token", result.data.tokenValue);
        }
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="mail">Email ID : </label>
        <input
          type="email"
          id="mail"
          placeholder="Enter your MailID"
          value={emailID}
          onChange={(e) => setemailID(e.target.value)}
          required
        />
        <br /><br />
        <label htmlFor="pswd">Password: </label>
        <input
          type="password"
          id="pswd"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <br /><br />
        <button>Login</button>
      </form>
      <p>Don't have an Account <Link to='/register'>Register</Link></p>
    </>
  );
};

export default Login;