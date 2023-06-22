import { useRef } from "react";
import "./register.css";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async(e)=>{
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      password.current.setCustomValidity("Password doesn't match");
    }
    else{
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
      }
      try{
        await axios.post("/auth/register",user);
        navigate("/login");
      }
      catch(err){
        console.log(err);
      }

    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Harshsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Harshsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" type="email" required ref={email} className="loginInput" />
            <input placeholder="Password" type="password" required ref={password} className="loginInput" />
            <input placeholder="Password Again" type="password" required ref={passwordAgain} className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <Link to="/login" style={{padding:"0 0 0 0",textAlign:"center"}}>
            <button className="loginRegisterButton">
              Log into Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}