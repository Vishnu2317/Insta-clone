import React, { useState } from "react";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  
  const [username, setusername] = useState("");
  const [emailID, setemailID] = useState("");
  const [userImage, setuserImage] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [password, setpassword] = useState("");

  const nav = useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = {
        username :username,
        emailID:emailID,
        userImage:userImage,
        mobileNumber:mobileNumber,
        password:password
    }
    try {
        const response = await axios.post("https://insta-post-backend-api.onrender.com/register",newUser)
        alert(response.data.message);
        nav('/login')
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <>
      <h1>Register User</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">UserName : </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your Name"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
        <br /><br />
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
        <label htmlFor="image">Give your Image in (url): </label>
        <input
          type="text"
          id="image"
          placeholder="Image URL"
          value={userImage}
          onChange={(e) => setuserImage(e.target.value)}
          required
        />
        <br /><br />
        <label htmlFor="tel">Mobile Number: </label>
        <input
          type="text"
          id="tel"
          placeholder="Enter your Mobile Number"
          value={mobileNumber}
          onChange={(e) => setmobileNumber(e.target.value)}
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
        <button>Register</button>
      </form>
      <p>Already have an Account <Link to='/login'>Login</Link></p>
    </>
  );
};

export default Register;