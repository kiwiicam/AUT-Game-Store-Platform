import React from 'react'
import '../css/Header.css'
import { useNavigate } from 'react-router';
function Header() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('uid') ? true : false;
  return (
    <>
      <div className="header-banner" />
      <div className="header-main">
        <div className="header-content">
          <div className="left-group">
            <img src="http://localhost:3000/aut_logo_ribbon.png" alt="" />
            <div className="header-links">
              <h2 onClick={() => navigate('/')}>Home</h2>
              <h2 onClick={() => navigate('/browse')}>Browse</h2>
              <h2 onClick={() => navigate('/leaderboard')}>Leaderboard</h2>
              <h2 onClick={() => navigate('/about')}>About</h2>
            </div>
          </div>
          <div className="right-group">
            {loggedIn ? <h1 onClick={() => navigate('/account')}>Account</h1> : <button onClick={() => navigate('/signin')} className="login-button">Login</button>}
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
