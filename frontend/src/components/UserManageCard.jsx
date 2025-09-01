import React, { useEffect, useState } from 'react';
import '../css/UserManageCard.css'
import { RiArrowDropDownLine } from "react-icons/ri";

function UserManageCard({ name, email, date, firstn, lastn, role, pfp }) {

  const [selected, isSelected] = useState(false);
  const [userRole, setUserRole] = useState(role);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFirstn, setNewFirstn] = useState("");
  const [newLastn, setNewLastn] = useState("");

  useEffect(() => {

  }, [])

  const makeChanges = async () => {
    try {
      const form = new FormData()

      if (newName.trim() !== name && newName.trim() !== "") {
        form.append("name", newName)
      }

      if (newEmail.trim() !== email && newEmail.trim() !== "") {
        form.append("email", newEmail)
      }

      if (newFirstn.trim() !== firstn && newFirstn.trim() !== "") {
        form.append("firstn", newFirstn)
      }

      if (newLastn.trim() !== lastn && newLastn.trim() !== "") {
        form.append("lastn", newLastn)
      }

      if(form.getAll("name").length > 0 || form.getAll("email").length > 0 || form.getAll("firstn").length > 0 || form.getAll("lastn").length > 0) {
        const response = await axios.post('http://localhost:8000/api/database/adminupdaterole', form)
      }
      else{
        return;
      }
    }
    catch (error) {
      alert(error.message)
    }
  }

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
                <input placeholder={email} onChange={(e) => setNewEmail(e.target.value)} type="text" />
              </div>
              <div className='input-field-usermanage'>
                <h5>Username</h5>
                <input placeholder={name} onChange={(e) => setNewName(e.target.value)} type="text" />
              </div>
            </div>
            <div className='row2'>
              <div className='input-field-usermanage'>
                <h5>Firstname</h5>
                <input placeholder={firstn} onChange={(e) => setNewFirstn(e.target.value)} type="text" />
              </div>
              <div className='input-field-usermanage'>
                <h5>Lastname</h5>
                <input placeholder={lastn} onChange={(e) => setNewLastn(e.target.value)} type="text" />
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
              <button onClick={() => makeChanges()}>Save Changes?</button>
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
