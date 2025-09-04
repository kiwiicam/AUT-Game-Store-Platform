import React, { useState, useEffect, use } from 'react'
import { useLocation } from 'react-router-dom';
import '../css/Accountpage.css'

//settings components
import AccountInformation from '../components/AccountSettingsComponents/AccountInformation';
import PasswordSecurity from '../components/AccountSettingsComponents/PasswordSecurity';
import UploadAssignment from '../components/AccountSettingsComponents/UploadAssignment';
import ManageUploads from '../components/AccountSettingsComponents/ManageUploads';
import ManageUsers from '../components/AccountSettingsComponents/ManageUsers';
import StudentProfile from '../components/AccountSettingsComponents/StudentProfile';
import axios from 'axios';


function Accountpage() {

  const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

  const UserRole = {
    Admin: "admin",
    Student: "student",
    User: "user"
  }

  const [active, setActive] = useState(<AccountInformation />);
  const location = useLocation();


  const [access, setAccess] = useState(UserRole.User);



  useEffect(() => {
    if (location.state && location.state.fromManageUploads) {
      setActive(<ManageUploads />);
    }
  }, [location]);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const uid = localStorage.getItem('uid');
        const response = await axios.post(`${backend_url}/database/checkaccess`, { uid });
        const role = response.data.role;
        setAccess(role);
      }
      catch (error) {
        console.error("Error checking access:", error);
      }

    }
    checkAccess();
  }, [])

  return (
    <div className='account-main'>
      <div className='account-center'>
        <div className='left-options'>
          <div className='left-content'>
            <h1>Settings</h1>
            <div className='split'></div>
            <div id="first" className='setting' onClick={() => setActive(<AccountInformation />)}><h2>Account information</h2></div>
            <div className='setting' onClick={() => setActive(<PasswordSecurity />)}><h2>Password & Security</h2></div>
            {access === UserRole.Student || access === UserRole.Admin ?
              <>
                <h1>Student Tools</h1>
                <div className='split'></div>
                <div id="first" className='setting' onClick={() => setActive(<StudentProfile />)}><h2>Your Student Profile</h2></div>
                <div className='setting' onClick={() => setActive(<UploadAssignment />)}><h2>Upload Assignments</h2></div>
              </> : <></>}
            {access === UserRole.Admin ?
              <>
                <h1>Admin Tools</h1>
                <div className='split'></div>
                <div id="first" className='setting' onClick={() => setActive(<ManageUploads />)}><h2>Manage Upload Requests</h2></div>
                <div className='setting' onClick={() => setActive(<ManageUsers />)}><h2>Manage Users</h2></div>
                <div className='setting' onClick={() => setActive(<h2>Coming Soon</h2>)}><h2>View analytics</h2></div>
              </> : <></>}
          </div>
        </div>
        <div className='right-content'>
          <div className='right-inner'>
            {active}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Accountpage
