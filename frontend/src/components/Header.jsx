import React from 'react'
import '../css/Header.css'
function Header() {
  const loggedIn = localStorage.getItem('token') ? true : false;
  return (
    <>
      <div className="header-banner" />
      <div className="header-main">
        <div className="header-content">
          <div className="left-group">
            <img src="http://localhost:3000/aut_logo_ribbon.png" alt="" />
            <div className="header-links">
              <h2>Home</h2>
              <h2>Browse</h2>
              <h2>Leaderboard</h2>
              <h2>About</h2>
            </div>
          </div>
          <div className="right-group">
            {loggedIn ? <h1>Account</h1> : <button className="login-button">Login</button>}
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
