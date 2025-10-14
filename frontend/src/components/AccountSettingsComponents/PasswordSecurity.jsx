import React, { useEffect, useState } from "react";
import '../../css/PasswordSecurity.css';
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PasswordSecurity() {

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

    const [passwordCode, setPasswordCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [currentEmail, setCurrentEmail] = useState('');
    const [currentPhone, setCurrentPhone] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editField, setEditField] = useState('');
    const [editValue, setEditValue] = useState('');

    const [sentReset, setSentReset] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const uid = localStorage.getItem('uid');
                if (!uid) {
                    toast.error("User not logged in");
                    return;
                }

                const response = await axios.post(`${backend_url}/database/getuserinfo`, {
                    uid
                });

                setCurrentEmail(response.data.email || "user@example.com");
                setCurrentPhone(response.data.phone || "+64 ** *** ****");
            } catch (error) {
                toast.error("Failed to load user data");
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = (field, value) => {
        setEditField(field);
        setEditValue(value);
        setEditMode(true);
    };

    const handleEmailChange = async () => {
        if (!editValue || editValue.trim() === "") {
            toast.error("Email cannot be blank");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editValue)) {
            toast.error("Please enter a valid email address");
            return;
        }

        try {
            const uid = localStorage.getItem('uid');
            await axios.post(`${backend_url}/database/changeemail`, {
                uid: uid,
                newEmail: editValue.trim()
            });

            setCurrentEmail(editValue.trim());
            setEditMode(false);
            toast.success("Email updated successfully");
        } catch (error) {
            toast.error("Failed to update email");
        }
    };

    const handlePhoneChange = async () => {
        if (!editValue || editValue.trim() === "") {
            toast.error("Phone number cannot be blank");
            return;
        }

        try {
            const uid = localStorage.getItem('uid');
            await axios.post(`${backend_url}/database/changephone`, {
                uid: uid,
                newPhone: editValue.trim()
            });

            setCurrentPhone(editValue.trim());
            setEditMode(false);
            toast.success("Phone number updated successfully");
        } catch (error) {
            toast.error("Failed to update phone number");
        }
    };

    const handlePasswordChange = async () => {
        try {

            const uid = localStorage.getItem('uid');
            const email = localStorage.getItem('email');
            await axios.post(`${backend_url}/auth/changepassword`, {
                uid: uid,
                email: email
            });
            toast.success("Please check your email to reset your password.");
            setSentReset(true);
        } catch (error) {
            toast.error("Failed to update password.");
        }
    };

    const confirmPasswordChange = async () => {
        try {


            const uid = localStorage.getItem('uid');
            const email = localStorage.getItem('email');
            await axios.post(`${backend_url}/auth/confirmchangepassword`, {
                uid: uid,
                email: email,
                passwordCode: passwordCode,
                newPassword: newPassword
            });
            toast.success("Password updated successfully.");
            setSentReset(false);
            setNewPassword('');
            setPasswordCode('');

        }
        catch (error) {
            toast.error("Password must be 10 Characters in length, contain symbols and numbers");
        }
    }

    const handleSaveEdit = () => {
        if (editField === 'email') {
            handleEmailChange();
        } else if (editField === 'phone') {
            handlePhoneChange();
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditValue('');
        setEditField('');
    };

    const handleConfirmSave = () => {
        setEditMode(false);
        handleSaveEdit();
    };

    return (
        <div className="password-security-container">
            <div className="password-security">
                <ToastContainer />

                <div className="header">
                    <h1>Password & Security</h1>
                    <h2>Change your accounts password and manage security.</h2>
                </div>

                <div className="email-section">
                    <h3>Email</h3>
                    <p>Information about your email</p>
                    <div className="email-container">
                        <label>Email Address</label>
                        <div className="email-input">
                            <div className="email-input-field">{currentEmail}</div>
                            <div className="icon-email-container" onClick={() => handleEditClick('email', currentEmail)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="password-section">
                    <h3>Change Password</h3>
                    <p>Change your password here</p>

                    <div className="password-container">

                        <div className="field-container">
                            <label>Request a password reset email.</label>

                        </div>

                        <div className="update-button-container">
                            <div className="update-button">
                                <button onClick={handlePasswordChange}>
                                    Request email
                                </button>
                            </div>
                        </div>
                        {sentReset &&
                            <>
                                <div className="field-container">
                                    <label>Enter your password reset code</label>
                                    <input
                                        type="text"
                                        placeholder="reset code"
                                        value={passwordCode}
                                        onChange={(e) => setPasswordCode(e.target.value)}
                                    />
                                </div>
                                <div className="field-container">
                                    <label>Enter New Password</label>
                                    <input
                                        type="password"
                                        placeholder="new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="update-button-container">
                                    <div className="update-button">
                                        <button onClick={confirmPasswordChange}>
                                            Change password
                                        </button>
                                    </div>
                                </div>
                            </>

                        }
                    </div>
                </div>

                <div className="phone-section">
                    <h3>Phone</h3>
                    <p>Change your phone number here</p>

                    <div className="phone-container">
                        <label>Phone</label>
                        <div className="phone-input">
                            <div className="phone-input-field">{currentPhone}</div>
                            <div className="icon-phone-container" onClick={() => handleEditClick('phone', currentPhone)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div>
                </div>

                {editMode && (
                    <div className="edit-bg-ps">
                        <div className="edit-box-ps">
                            <h2>{editField === 'email' ? 'Edit Email Address' : 'Edit Phone Number'}</h2>
                            <input
                                className="edit-input-ps"
                                type={editField === 'email' ? 'email' : 'tel'}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                placeholder={editField === 'email' ? 'Enter new email' : 'Enter new phone number'}
                            />
                            <div className="button-container-ps">
                                <button onClick={handleCancelEdit}>Cancel</button>
                                <button onClick={handleConfirmSave}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PasswordSecurity;