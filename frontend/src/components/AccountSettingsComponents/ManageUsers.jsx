import React, { useEffect, useState } from 'react'
import '../../css/ManageUsers.css';
import UserManageCard from '../UserManageCard';
function ManageUsers() {
    const [search, setSearch] = useState("")
    const [role, setRole] = useState("all")
    const [dateSort, setDateSort] = useState("none")
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers([

        ])
    }, [])

    return (
        <div className='manager-users'>
            <div className='top-users'>
                <h1>Manage Users</h1>
                <h2>Manage all user accounts here. You change change account roles and any other relevant details on this page.</h2>
                <h3>Users</h3>
                <h2>View the user accounts below, you can view more and make changes by clicking the drop down.</h2>
            </div>
            <div className='users-filters'>
                <input type='text' placeholder='Search username...' />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ color: '#0000006B' }}>
                    <option value="all">All users</option>
                    <option value="user">User</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
                <select
                    value={dateSort}
                    onChange={(e) => setDateSort(e.target.value)}
                    style={{ color: '#0000006B' }}>
                    <option value="none">No sort</option>
                    <option value="recent">Most recent</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
            <div className='user-outer-container'>
                <div className='user-info-bar'></div>
                <div className='overflow-users'>
                    {users.map((item, index) => (
                        <UserManageCard />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ManageUsers
