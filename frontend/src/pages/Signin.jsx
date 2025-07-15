import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function Signin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
            <a onClick={() => {navigate("/forgotpw")}}>Forgot password?</a>
          </div>
          <input className='inputs' type="password" placeholder='••••••••' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='checkbox'>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label class="form-check-label" for="flexSwitchCheckDefault">Keep me logged in</label>
          </div>
        </div>
        <button className='but-acc'>Login</button>
        <div className='divider'></div>
        <label className='account'>Don't have an account?</label>
        <button className='but-log'>Create Account</button>
      </div>
    </div>
  )
}

export default Signin
