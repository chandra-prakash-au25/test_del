import React from 'react'
import './login.css'
import { useState } from 'react';
import axios from "axios";
import {json, useNavigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit =(event) => {
    console.log(email,password)
    
    axios.post('/apiv2/auth/sign-in?authToken=a71fbcc0-b89f-ae9b-b998-a771b3b4a24f&__xreq__=true',{"emailMobile" : email,"pwd" : password,"role":"S"}
    ).then((response) => {
      //console.log(response.data);
      localStorage.setItem('dataKey',JSON.stringify(response.data));
      console.log(localStorage.getItem("dataKey"))
      navigate('/home', { replace: true });
    }).catch((err)=>{
      alert(err)
    });
    event.preventDefault();

} 
  return (
    <div className='login-form'>

      <h1>Login</h1>
      <div className="content">
            <div className="input-field">
              <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-field">
              <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <a href="#" className="link">Forgot Your Password?</a>
          </div>
          <div className="action">
            <button>Register</button>
            <button onClick={handleSubmit}>Sign in</button>
    </div>
    </div>
  )
}

export default Login