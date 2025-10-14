import react, { useEffect, useState } from "react"
import '../../css/AccountInformation.css'
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
function AccountInformation() {

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [image, setImage] = useState();

    const changepfp = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*.png';
        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('image', file, 'pfp.png');
            // formData.append('image', fs.createReadStream('./default-pfp.png'), 'pfp.png');

            formData.append('uid', localStorage.getItem('uid'));
            try {
                const response = await axios.post(`${backend_url}/storage/setpfp`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(() => {
                    window.location.href = window.location.href;
                });
            }
            catch (err) {
                alert(err.message);
            }
        }
        input.click();
    }
    // Handle success (e.g., show a success message)
    // Optionally, refresh the profile picture
    //   const image = await axios.post(`http://localhost:8000/api/storage/getpfp`,
    //   { type: 'uid',
    //       id: localStorage.getItem('uid')
    //   })
    //  setImage(image.data.imageUrl);
    // }
    //  window.alert("testing");
    //   }         input.click();
    //  catch (err) {
    //    alert(err.message);
    //   }
    //  }

    useEffect(() => {
        const getImage = async () => {
            try {
                const image = await axios.post(`${backend_url}/storage/getpfp`,
                    {
                        type: 'uid',
                        id: localStorage.getItem('uid')
                    })
                setImage(image.data.imageUrl);
            }
            catch (err) {
                alert(err.message);
            }
        }
        getImage();
    }, []);

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
                const response = await axios.post(`${backend_url}/database/getuserinfo`, {
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
            const response = await axios.post(`${backend_url}/database/changename`, {
                uid: uid,
                newName: newInputValue,
                type: 'username',
                password: localStorage.getItem('password')
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
            const response = await axios.post(`${backend_url}/database/changename`, {
                uid: uid,
                newName: newInputValue,
                type: 'firstname',
                password: localStorage.getItem('password')
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
        try {
            const response = await axios.post(`${backend_url}/database/changename`, {
                uid: uid,
                newName: newInputValue,
                type: 'lastname',
                password: localStorage.getItem('password')

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
            <h2>Manage your account details here.</h2>
            <h1 className="subheading">Profile details</h1>
            <h2>Change your profile details that others can view</h2>

            <div className="profile-pics"><img src={image} alt="Profile picture" /><div className="icon-containers"><MdOutlineModeEditOutline onClick={() => changepfp()} className="edit-icon" /></div></div>
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