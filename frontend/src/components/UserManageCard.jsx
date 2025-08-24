import React, { useEffect, useState } from 'react';
import '../css/UserManageCard.css'
import { RiArrowDropDownLine } from "react-icons/ri";

function UserManageCard({ name, email, date, firstn, lastn, role, pfp }) {

  const [selected, isSelected] = useState(false);
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    setUserRole(role)
  }, [])

  return (
    <div>
      <div className='inner-user'>
        {selected ?
          <div className='user-change-box'>
            <div className='top-user-card'>
              <div className='user-manage-pfp' id='larger'><img src={pfp} /></div>
              <div>
                <h5>{name}</h5>
                <h2>{role}</h2>
              </div>

            </div>
            <div className='row1'>
              <div className='input-field-usermanage'>
                <h5>Email Address</h5>
                <input placeholder={email} type="text" />
              </div>
              <div className='input-field-usermanage'>
                <h5>Username</h5>
                <input placeholder={name} type="text" />
              </div>
            </div>
            <div className='row2'>
              <div className='input-field-usermanage'>
                <h5>Firstname</h5>
                <input placeholder={firstn} type="text" />
              </div>
              <div className='input-field-usermanage'>
                <h5>Lastname</h5>
                <input placeholder={lastn} type="text" />
              </div>
            </div>
            <div className='row3'>

              <div className='input-field-usermanage'>
                <h5>Role</h5>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  style={{ color: '#0000006B' }}>
                  <option value="user">User</option>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button>Save Changes?</button>
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
        <RiArrowDropDownLine className={!selected ? 'dropdown-users' : 'dropdown-userupsidedown'} onClick={() => isSelected((prev) => !prev)} />
      </div>
      <div className='thin-grey-line'></div>
    </div>
  )
}

export default UserManageCard
