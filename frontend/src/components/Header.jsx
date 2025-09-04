import React, { useState } from 'react'
import '../css/Header.css'
import { useNavigate } from 'react-router';
import { IoMdArrowDropdown } from "react-icons/io";
function Header() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('uid') ? true : false;
  const [dropdown, setDropdown] = useState(false)
  return (
    <>
      <div className="header-banner" />
      <div className="header-main">
        <div className="header-content">
          <div className="left-group">
            <img src="https://deployment-test.d2mwlph9qkry2s.amplifyapp.com/aut_logo_ribbon.png" alt="" />
            <div className="header-links">
              <h2 onClick={() => navigate('/')}>Home</h2>
              <h2 onClick={() => navigate('/browse')}>Browse</h2>
              <h2 onClick={() => navigate('/about')}>About</h2>
            </div>
          </div>
          <div className="right-group">
            {loggedIn ?
              <>
                <div className='pfp-header' onClick={() => navigate('/account')}>
                  <div className='pfp-manage'><img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' /> </div>
                  <h2>Account</h2>
                </div>
                  <IoMdArrowDropdown className={dropdown ? 'logout-dropdown-up' :'logout-dropdown'} onClick={() => setDropdown((prev) => !prev)} />
                    {dropdown ? 
                    <div onClick={() => {localStorage.removeItem('uid'); navigate('/')}} className='logout-container'>
                      <h2>Logout</h2>
                    </div>
                    : <> </>
                    }
              </>
              :
              <button onClick={() => navigate('/signin')} className="login-button">Login</button>}
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
