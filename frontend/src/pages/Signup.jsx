import React, { useState } from 'react'
import '../css/Signup.css'
import { MdHelp } from "react-icons/md";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

function Signup() {

  const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';
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
      toast.error('Passwords do not match.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
    if (
      password.length < 10 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      toast.error('Password must be at least 10 characters long and contain numbers, special characters and upper and lowercase letters. e.g. Abcdef123!', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${backend_url}/auth/signup`, {
        email: email,
        password: password
      })
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      if (response.data.error === "UsernameExists") {
        navigate(response.data.navigate);
        return;
      }
      const uid = response.data.item;
      localStorage.setItem('uid', uid);
      const dbResponse = await axios.post(`${backend_url}/database/adduser`, {
        uid: uid,
        username: username,
        email: email
      });
      if (dbResponse.data.error) {
        alert(dbResponse.data.error);
        return;
      }

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
      <ToastContainer />
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
        <button className='but-log' onClick={() => navigate('/signin')}>Login</button>
      </div>
    </div>
  )
}

export default Signup
