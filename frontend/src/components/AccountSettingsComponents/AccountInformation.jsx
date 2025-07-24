import react, { useEffect, useState } from "react"
import '../../css/AccountInformation.css'
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
function AccountInformation() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const [currentUsername, setCurrentUsername] = useState('');
    const [currentFirstName, setCurrentFirstName] = useState('');
    const [currentLastName, setCurrentLastName] = useState('');

    const [editMode, setEditMode] = useState(false);
    const [currentlyEditing, setCurrentlyEditing] = useState('');
    const [editFieldValue, setEditFieldValue] = useState('');
    const [newInputValue, setNewInputValue] = useState('');
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const uid = localStorage.getItem('uid');
                if (!uid) {
                    alert("User not logged in");
                    return;
                }
                const response = await axios.post('http://localhost:8000/api/database/getuserinfo', {
                    uid
                });

                setCurrentUsername((response.data.username ?? "").trim() === "" ? "No username set" : response.data.username);
                setCurrentFirstName((response.data.firstname ?? "").trim() === "" ? "No firstname set" : response.data.firstname);
                setCurrentLastName((response.data.lastname ?? "").trim() === "" ? "No lastname set" : response.data.lastname);

            }
            catch (error) {
                alert(error.message);
                return;
            }
        }
        fetchUserData();
    }, []);

    function handleChange(field) {
        if (!newInputValue || newInputValue.trim() === "") {
            // display error
            return;
        }
        else if (field === 'Username') {
            setUsername(newInputValue.trim());
            handleUsernameChange(newInputValue.trim());
        } else if (field === 'First Name') {
            setFirstName(newInputValue.trim());
            handleFirstNameChange(newInputValue.trim());
        } else if (field === 'Last Name') {
            setLastName(newInputValue.trim());
            handleLastNameChange(newInputValue.trim());
        }
    }

    async function handleUsernameChange(newInputValue) {
        const uid = localStorage.getItem('uid');
        try {
            const response = await axios.post('http://localhost:8000/api/database/changename', {
                uid: uid,
                newName: newInputValue,
                type: 'username'
            });
            setCurrentUsername(newInputValue);
        }
        catch (error) {
            alert(error.message);
            return;
        }
    }

    function handleProfilePicChange() {
    }

    async function handleFirstNameChange(newInputValue) {
        const uid = localStorage.getItem('uid');
        try {
            const response = await axios.post('http://localhost:8000/api/database/changename', {
                uid: uid,
                newName: newInputValue,
                type: 'firstname'
            });
            setCurrentFirstName(newInputValue);
        }
        catch (error) {
            alert(error.message);
            return;
        }

    }

    async function handleLastNameChange(newInputValue) {
        const uid = localStorage.getItem('uid');
        alert(newInputValue)
        try {
            const response = await axios.post('http://localhost:8000/api/database/changename', {
                uid: uid,
                newName: newInputValue,
                type: 'lastname'
            });
            setCurrentLastName(newInputValue);
        }
        catch (error) {
            alert(error.message);
            return;
        }

    }

    function handleEditClick(field, fieldValue) {
        setEditMode(true);
        setCurrentlyEditing(fieldValue);
        setEditFieldValue(field);
    }
    return (
        <div className="account-information">
            <h1>Account Information</h1>
            <h2>Managae your account details here.</h2>
            <h1 className="subheading">Profile details</h1>
            <h2>Change your profile details that others can view</h2>

            <div className="profile-pic">{/*<img src="" alt="Profile picture" />*/}<div className="icon-container"><MdOutlineModeEditOutline className="edit-icon" /></div></div>
            <div className="username">
                <h2>Username</h2>
                <div className="username-input">
                    <div className="username-input-field">{currentUsername}</div>
                    <div className="icon-username-container" onClick={() => handleEditClick('Username', currentUsername)}>
                        <MdOutlineModeEditOutline className="edit-icon" />
                    </div>
                </div>
            </div>
            <h1 className="subheading" id="space">Personal details</h1>
            <h2>Change your profile details that others can view</h2>
            <div className="username">
                <h2>First Name</h2>
                <div className="username-input">
                    <div className="username-input-field" onChange={(e) => setFirstName(e.target.value)}>{currentFirstName}</div>
                    <div className="icon-username-container" onClick={() => handleEditClick('First Name', currentFirstName)}>
                        <MdOutlineModeEditOutline className="edit-icon" />
                    </div>
                </div>
            </div>
            <div className="username">
                <h2>Last Name</h2>
                <div className="username-input">
                    <div className="username-input-field" onChange={(e) => setLastName(e.target.value)}>{currentLastName}</div>
                    <div className="icon-username-container" onClick={() => handleEditClick('Last Name', currentLastName)}>
                        <MdOutlineModeEditOutline className="edit-icon" />
                    </div>
                </div>
            </div>
            {editMode ? <div className="edit-box"> <h2>{editFieldValue}</h2> <input className="edit-input" placeholder={currentlyEditing} onChange={(e) => setNewInputValue(e.target.value)} />  <div className="button-container"><button onClick={() => setEditMode(false)}>Cancel</button> <button onClick={() => { setEditMode(false); handleChange(editFieldValue) }}>Save</button></div> </div> : <></>}
        </div>
    )
}
export default AccountInformation