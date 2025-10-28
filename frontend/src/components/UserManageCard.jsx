import React, { useEffect, useState } from 'react';
import '../css/UserManageCard.css'
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function UserManageCard({ name, email, date, firstn, lastn, role, pfp, uid }) {

  const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

  const [selected, isSelected] = useState(false);
  const [userRole, setUserRole] = useState(role);

  const [oldName, setOldName] = useState(name);
  const [oldEmail, setOldEmail] = useState(email);
  const [oldFirstn, setOldFirstn] = useState(firstn);
  const [oldLastn, setOldLastn] = useState(lastn);

  const old = new Date(Number(date));
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formatted = new Intl.DateTimeFormat('en-NZ', options).format(old);

  const [displayDate, setDisplayDate] = useState(formatted);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFirstn, setNewFirstn] = useState("");
  const [newLastn, setNewLastn] = useState("");

  useEffect(() => {

  }, [])

  const makeChanges = async () => {
    try {
      const payload = {}

      if (newName.trim() !== oldName && newName.trim() !== "") {
        payload.name = newName
        setOldName(newName)
        setNewName("")
      }

      if (newEmail.trim() !== oldEmail && newEmail.trim() !== "") {
        payload.email = newEmail
        setOldEmail(newEmail)
        setNewEmail("")
      }

      if (newFirstn.trim() !== oldFirstn && newFirstn.trim() !== "") {
        payload.firstn = newFirstn
        setOldFirstn(newFirstn)
        setNewFirstn("")
      }

      if (newLastn.trim() !== oldLastn && newLastn.trim() !== "") {
        payload.lastn = newLastn
        setOldLastn(newLastn)
        setNewLastn("")
      }
      if (userRole !== role) {
        payload.role = userRole
      }

      if (Object.keys(payload).length > 0) {
        payload.uid = uid
        // eslint-disable-next-line no-undef
        const response = await axios.post(`${backend_url}/database/adminupdaterole`, payload)
        toast.success("User information updated successfully!");
      }
      else {
        return;
      }
    }
    catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <ToastContainer />
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
                <input placeholder={oldEmail} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="text" />
              </div>
              <div className='input-field-usermanage'>
                <h5>Username</h5>
                <input placeholder={oldName} value={newName} onChange={(e) => setNewName(e.target.value)} type="text" />
              </div>
            </div>
            <div className='row2'>
              <div className='input-field-usermanage'>
                <h5>Firstname</h5>
                <input placeholder={oldFirstn} value={newFirstn} onChange={(e) => setNewFirstn(e.target.value)} type="text" />
              </div>
              <div className='input-field-usermanage'>
                <h5>Lastname</h5>
                <input placeholder={oldLastn} value={newLastn} onChange={(e) => setNewLastn(e.target.value)} type="text" />
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
            <h4>{displayDate}</h4>
          </div>
        }
        <RiArrowDropDownLine className={!selected ? 'dropdown-users' : 'dropdown-userupsidedown'} onClick={() => isSelected((prev) => !prev)} />
      </div>
      <div className='thin-grey-line'></div>
    </div>
  )
}

export default UserManageCard
