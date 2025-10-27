import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios';
import '../css/Signin.css';
import { toast, ToastContainer } from 'react-toastify';

function Signin() {

  const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    if (email === '' || password === '') {
      //display error message
      return;
    }
    try {
      const response = await axios.post(`${backend_url}/auth/login`, {
        email: email,
        password: password
      })
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      if (response.data.error === "UserNotConfirmed") {
        const verify = await axios.post(`${backend_url}/auth/resend`, {
          email: email,
        });
        navigate(response.data.navigate);
        return;
      }
      localStorage.setItem('uid', response.data.item);
      retrieveUserInfo();
      navigate("/")
      return;
    }
    catch (error) {
      alert(error)
      return;
    }
  }

  async function retrieveUserInfo() {
    const uid = localStorage.getItem('uid');
    try {
      const response = await axios.post(`${backend_url}/database/getuserinfo`, {
        uid: uid
      });
      localStorage.setItem('accountType', response.data.accountType);
    }
    catch (error) {
      alert("Error retrieving user info: " + error);
    }
  }


  return (
    <div className='outer-background'>
      <ToastContainer />
      <div className='inner-container'>
        <img src="http://localhost:3000/aut_logo.jpg" alt="aut logo" />
        <label className='title'>Log In</label>
        <div className='email'>
          <label>Email Address</label>
          <input className='inputs' type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='password'>
          <div className='forgot-password'>
            <label>Password</label>
            <a onClick={() => { navigate("/forgotpw") }}>Forgot password?</a>
          </div>
          <input className='inputs' type="password" placeholder='••••••••' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='checkbox'>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label class="form-check-label" for="flexSwitchCheckDefault">Keep me logged in</label>
          </div>
        </div>
        <button className='but-acc' onClick={() => login()}>Login</button>
        <div className='divider'></div>
        <label className='account'>Don't have an account?</label>
        <button className='but-log' onClick={() => { navigate("/signup") }} >Create Account</button>
      </div>
    </div>
  )
}

export default Signin
