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
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            { name: "Kiwicam123", email: "mastercamnz@goatmail.com", date: "23/08/2025", firstn: "Campbell", lastn: "Boulton", role: "User", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },

        ])
    }, [])

    return (
        <div className='manage-users'>
            <div className='top-users'>
                <div>
                    <h1>Manage Users</h1>
                    <h2>Manage all user accounts here. You change change account roles and any other relevant details on this page.</h2>
                </div>
                <div>
                    <h3>Users</h3>
                    <h2>View the user accounts below, you can view more and make changes by clicking the drop down.</h2>
                </div>
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

                <div className='user-accounts'>
                    <div className='overflow-users'>
                        <div className='top-sticky-users'>
                            <div className='user-details'>
                                <h2>Account</h2>
                                <h2>Email</h2>
                                <h2>Role</h2>
                                <h2>Date Joined</h2>
                            </div>
                        </div>
                        <div className='thin-grey-line'></div>
                        {users.map((item, index) => (
                            <UserManageCard name={item.name} email={item.email} date={item.date} firstn={item.firstn} lastn={item.lastn} role={item.role} pfp={item.pfp} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ManageUsers
