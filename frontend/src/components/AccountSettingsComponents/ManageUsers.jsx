import React, { useEffect, useState } from 'react'
import '../../css/ManageUsers.css';
import UserManageCard from '../UserManageCard';
import axios from 'axios';
function ManageUsers() {

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

    const [search, setSearch] = useState("")
    const [role, setRole] = useState("all")
    const [dateSort, setDateSort] = useState("none")
    const [users, setUsers] = useState([])

    const [userCount, setUserCount] = useState(0)

    const [currentUserDisplay, setCurrentUserDisplay] = useState([])
    const [filteredResults, setFilteredResults] = useState([])
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const userInfo = await axios.get(`${backend_url}/database/adminallusers`)
                setUserCount(userInfo.data.realData.length);
                const users = userInfo.data.realData.map((item) => ({
                    email: item.email,
                    name: item.username,
                    
                    
                 //   pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    firstn: item.firstname || "Not set",
                    lastn: item.lastname || "Not set",
                    role: item.accountType || "Not Set",
                    uid: item.uid,
                    dateJoined: item.dateJoined || 1193512123123

                }));
                for (const user of users)
                {
                const image = await axios.post(`${backend_url}/storage/getpfp`,
                {
                    type: 'uid',
                    id: user.uid
                });
                user.pfp = image.data.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                }
                setUsers(users);
                setCurrentUserDisplay(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, [])

    const filterChange = () => {
        window.alert("hi");

    }

    const searchChange = () => {
    

    }
    useEffect(()=>{
        const sortArray=[];
        let t = 0;
      //  window.alert(search);
        if (search == "")
        {
        setCurrentUserDisplay(users);

        }
        else{
        for (const user of users)
        {
            const name = user.name;
            if (search.length <= name.length)
            {
                let z = 0;
                for (let i =0; i < search.length;i++)
                {
                    if (search.charAt(i) != name.charAt(i))
                    {

                        z = 1;
                    }
                }
                if (z == 0)
                {
                    sortArray[t] = user;
                    t++
                }
            }
        }
        sortArray.sort(function(a,b){return b.name - a.name});
        setCurrentUserDisplay(sortArray);
    }
    },[search, setSearch]);

    useEffect(() => {
        if (dateSort == "oldest")
        {
        const sortArray = [...currentUserDisplay].sort((a, b) => a.dateJoined - b.dateJoined);
        
        setCurrentUserDisplay(sortArray);
        }
        else
        {
        const sortArray = [...currentUserDisplay].sort((a, b) => b.dateJoined - a.dateJoined);
        setCurrentUserDisplay(sortArray);

        }
    },[dateSort, setDateSort]);
  
    useEffect(() => {
        const sortArray = [];
        let i = 0;
        if (role == "all")
        {
            setCurrentUserDisplay(users);
        }
        else 
        {
        for (const user of users)
        {
            if (user.role == role)
            {
                sortArray[i] = user;
                i++
            }

        }

        setCurrentUserDisplay(sortArray);
        }
    },[role, setRole]);

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
                <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Search username...' />
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
                <h2>Total users: {userCount}</h2>
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
                        {currentUserDisplay.map((item, index) => (
                            <UserManageCard name={item.name} email={item.email} date={item.dateJoined} firstn={item.firstn} lastn={item.lastn} role={item.role} pfp={item.pfp} uid={item.uid} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ManageUsers
