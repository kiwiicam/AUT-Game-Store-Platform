import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../css/Accountpage.css'

//settings components
import AccountInformation from '../components/AccountSettingsComponents/AccountInformation';
import PasswordSecurity from '../components/AccountSettingsComponents/PasswordSecurity';
import Languages from '../components/AccountSettingsComponents/Languages';
import OtherSettings from '../components/AccountSettingsComponents/OtherSettings';
import UploadAssignment from '../components/AccountSettingsComponents/UploadAssignment';
import ManageUploads from '../components/AccountSettingsComponents/ManageUploads';


function Accountpage() {
  const [active, setActive] = useState(<AccountInformation />);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.fromManageUploads) {
      setActive(<ManageUploads />);
    }
  }, [location]);

  return (
    <div className='account-main'>
      <div className='account-center'>
        <div className='left-options'>
          <div className='left-content'>
            <h1>Settings</h1>
            <div className='split'></div>
            <div id="first" className='setting' onClick={() => setActive(<AccountInformation />)}><h2>Account information</h2></div>
            <div className='setting' onClick={() => setActive(<PasswordSecurity />)}><h2>Password & Security</h2></div>
            <div className='setting' onClick={() => setActive(<Languages />)}><h2>Languages</h2></div>
            <div className='setting' onClick={() => setActive(<OtherSettings />)}><h2>Other</h2></div>
            <h1>Student Tools</h1>
            <div className='split'></div>
            <div id="first" className='setting' onClick={() => setActive(<h2>Coming Soon</h2>)}><h2>Your Student Profile</h2></div>
            <div className='setting' onClick={() => setActive(<UploadAssignment />)}><h2>Upload Assignments</h2></div>
            <div className='setting' onClick={() => setActive(<h2>Coming Soon</h2>)}><h2>Verify Account</h2></div>
            <h1>Admin Tools</h1>
            <div className='split'></div>
            <div id="first" className='setting' onClick={() => setActive(<ManageUploads />)}><h2>Manage Upload Requests</h2></div>
            <div className='setting' onClick={() => setActive(<h2>Coming Soon</h2>)}><h2>Edit Upload instructions</h2></div>
            <div className='setting' onClick={() => setActive(<h2>Coming Soon</h2>)}><h2>Manage Users</h2></div>
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
