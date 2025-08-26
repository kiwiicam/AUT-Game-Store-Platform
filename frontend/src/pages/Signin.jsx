import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios';
import '../css/Signin.css';

function Signin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    if (email === '' || password === '') {
      //display error message
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email: email,
        password: password
      })
      localStorage.setItem('email', email);
      if (response.data.error === "UserNotConfirmed") {
        alert(response.data.error);
        const verify = await axios.post('http://localhost:8000/api/auth/resend', {
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
      const response = await axios.post('http://localhost:8000/api/database/getuserinfo', {
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
