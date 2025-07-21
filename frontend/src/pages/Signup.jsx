import React, { useState } from 'react'
import '../css/Signup.css'
import { MdHelp } from "react-icons/md";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';
function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isHoveredUser, setIsHoveredUser] = useState(false);
  const [isHoveredPW, setIsHoveredPW] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnterUser = () => setIsHoveredUser(true);
  const handleMouseLeaveUser = () => setIsHoveredUser(false);

  const handleMouseEnterPW = () => setIsHoveredPW(true);
  const handleMouseLeavePW = () => setIsHoveredPW(false);


  async function signup() {
    //checks before signup
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      //set and display error message
      return;
    }
    if (password !== confirmPassword) {
      //set and display error message
      return;
    }
    if (password.length < 10 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      //set and display error message
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/signup', {
        email: email,
        password: password
      })
      localStorage.setItem('email', email);

      const uid = response.data.item;
      localStorage.setItem('uid', uid);
      const dbResponse = await axios.post('http://localhost:8000/api/database/adduser', {
        uid: uid,
        username: username
      });

      alert(response.data.error || response.data.message);
      alert(dbResponse.data.error || dbResponse.data.message);

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate("/verify");
      return
    }
    catch (error) {
      alert(error)
      return;
    }
  }


  return (
    <div className='outer-background'>
      <div className='inner-container'>
        <img src="http://localhost:3000/aut_logo.jpg" alt="aut logo" />
        <label className='title'>Sign Up</label>
        <div className='username'>
          <label>Username</label>
          <input className='inputs' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
          <div className='user-icon' onMouseEnter={handleMouseEnterUser} onMouseLeave={handleMouseLeaveUser}>
            <MdHelp />
            {isHoveredUser ? <div className='hover-message'>Username must be unique and be appropriate</div> : null}
          </div>
        </div>
        <div className='email'>
          <label>Email Address</label>
          <input className='inputs' type="email" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='password'>
          <label>Password</label>
          <input className='inputs' type="password" placeholder='••••••••' onChange={(e) => setPassword(e.target.value)} />
          <div className='user-icon' onMouseEnter={handleMouseEnterPW} onMouseLeave={handleMouseLeavePW}>
            <MdHelp />
            {isHoveredPW ? <div className='hover-message'>Password must be 10 Characters in length, contain symbols and numbers</div> : null}
          </div>
        </div>
        <div className='password'>
          <label>Confirm Password</label>
          <input className='inputs' type="password" placeholder='••••••••' onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className='checkbox'>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label class="form-check-label" for="flexSwitchCheckDefault">Keep me logged in</label>
          </div>
        </div>
        <button className='but-acc' onClick={() => signup()}>Create Account </button>
        <div className='divider'></div>
        <label className='account'>Already have an account?</label>
        <button className='but-log'>Login</button>
      </div>
    </div>
  )
}

export default Signup
