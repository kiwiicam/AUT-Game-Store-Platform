import React, { useState } from 'react';
import '../css/UserManageCard.css'
import { RiArrowDropDownLine } from "react-icons/ri";

function UserManageCard({ name, email, date, firstn, lastn, role, pfp }) {

  const [selected, isSelected] = useState(false);

  return (
    <div>
      <div className='inner-user'>
        {selected ?
          <div className='user-change-box'>
            <div className='top-user-card'>
              
            </div>
            <div className='row1'>
              <input type="text" />
              <input type="text" /> 
            </div>
            <div className='row2'>
            <input type="text" /> 
            <input type="text" /> 
            </div>
            <div className='row3'> 
            <input type="text" /> 
            <button></button>
            </div>
            
          </div>
          : 
          <div className='user-info'>
            <div className='pfp-outer-user'>
              <div className='user-manage-pfp'><img src={pfp} /></div>
              <h4>{name}</h4>
            </div>
            <h4>{email}</h4>
            <h4>{role}</h4>
            <h4>{date}</h4>
          </div>
        }
        <RiArrowDropDownLine className='dropdown-users' onClick={() => isSelected((prev) => !prev)} />
      </div>
      <div className='thin-grey-line'></div>
    </div>
  )
}

export default UserManageCard
