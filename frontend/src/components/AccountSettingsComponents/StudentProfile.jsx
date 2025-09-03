import React, { useEffect, useState } from "react";
import '../../css/StudentProfile.css';
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentProfile() {
    const [aboutMe, setAboutMe] = useState('');
    const [skills, setSkills] = useState(['', '', '', '']);
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [portfolioLink, setPortfolioLink] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentAge, setStudentAge] = useState('');

    const [editMode, setEditMode] = useState(false);
    const [editField, setEditField] = useState('');
    const [editValue, setEditValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const uid = localStorage.getItem('uid');
                if (!uid) {
                    toast.error("User not logged in");
                    return;
                }

                const response = await axios.post('http://localhost:8000/api/database/getuserinfo', {
                    uid
                });

                setAboutMe(response.data.aboutMe || "Write a small paragraph about your game! What gets the player/the mechanics across? Tell and inform the game to the student.");
                setSkills(response.data.skills || ['C++ Programmer', 'C++ Programmer', 'C++ Programmer', 'C++ Programmer']);
                setContactEmail(response.data.contactEmail || "someone@email.com");
                setContactPhone(response.data.contactPhone || "0270102222");
                setPortfolioLink(response.data.portfolioLink || "https://yourportfolio.com");
                setStudentName(response.data.studentName || "Student Name");
                setStudentAge(response.data.studentAge || "Student Age");
            } catch (error) {
                toast.error("Failed to load user data");
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = (field, value, index = null) => {
        setEditField(field);
        setEditValue(value);
        setEditIndex(index);
        setEditMode(true);
    };

    const handleSaveEdit = async () => {
        if (!editValue || editValue.trim() === "") {
            toast.error("Field cannot be blank");
            return;
        }

        try {
            const uid = localStorage.getItem('uid');
            let updateData = { uid };

            switch (editField) {
                case 'aboutMe':
                    updateData.aboutMe = editValue.trim();
                    setAboutMe(editValue.trim());
                    break;
                case 'skill':
                    const newSkills = [...skills];
                    newSkills[editIndex] = editValue.trim();
                    updateData.skills = newSkills;
                    setSkills(newSkills);
                    break;
                case 'contactEmail':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(editValue)) {
                        toast.error("Please enter a valid email address");
                        return;
                    }
                    updateData.contactEmail = editValue.trim();
                    setContactEmail(editValue.trim());
                    break;
                case 'contactPhone':
                    updateData.contactPhone = editValue.trim();
                    setContactPhone(editValue.trim());
                    break;
                case 'portfolioLink':
                    updateData.portfolioLink = editValue.trim();
                    setPortfolioLink(editValue.trim());
                    break;
                case 'studentName':
                    updateData.studentName = editValue.trim();
                    setStudentName(editValue.trim());
                    break;
                case 'studentAge':
                    updateData.studentAge = editValue.trim();
                    setStudentAge(editValue.trim());
                    break;
                default:
                    break;
            }

            await axios.post('http://localhost:8000/api/database/updatestudentprofile', updateData);

            setEditMode(false);
            setEditValue('');
            setEditField('');
            setEditIndex(null);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile", {
                position: 'top-center', autoClose: 3000,
            });
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditValue('');
        setEditField('');
        setEditIndex(null);
    };

    const handleSaveField = async (e) => {
        const field = e.target.dataset.field;
        const index = e.target.dataset.index;
        const value = e.target.value;

        if (!value || value.trim() === "") {
            toast.error("Field cannot be blank");
            return;
        }

        try {
            const uid = localStorage.getItem('uid');
            let updateData = { uid };

            switch (field) {
                case 'aboutMe':
                    updateData.aboutMe = value.trim();
                    break;
                case 'skills':
                    updateData.skills = skills;
                    break;
                default:
                    break;
            }

            await axios.post('http://localhost:8000/api/database/updatestudentprofile', updateData);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    const handleViewPortfolio = () => {
        // Navigate to portfolio view or open in new tab
        window.open(portfolioLink, '_blank');
    };

    return (
        <div className="student-profile-container">
            <div className="student-profile">
                <ToastContainer />

                <div className="header">
                    <h1>Student Profile</h1>
                    <h2>Manage your student profile information here</h2>
                </div>

                <div className="section displayed-information">
                    <h3>Displayed Information</h3>
                    <p>Alter information that will be displayed under your project(s)</p>

                    <div className="field-group">
                        <label>Personal Details</label>
                        <div className="personal-details-container">
                            <div className="personal-details-field">{studentName}</div>
                            <div className="edit-icon-container" onClick={() => handleEditClick('studentName', studentName)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="personal-details-container-2">
                            <div className="personal-details-field">{studentAge}</div>
                            <div className="edit-icon-container" onClick={() => handleEditClick('studentAge', studentAge)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div>

                    {/* <div className="field-group">
                        <label>About Me (500 word limit)</label>
                        <div className="about-me-container">
                            <div className="about-me-field">{aboutMe}</div>
                            <div className="edit-icon-container" onClick={() => handleEditClick('aboutMe', aboutMe)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="field-group">
                        <label>Skills (eg. C++ Programmer)</label>
                        <div className="skills-container">
                            {skills.map((skill, index) => (
                                <div key={index} className="skill-item">
                                    <div className="skill-field">{skill}</div>
                                    <div className="edit-icon-container" onClick={() => handleEditClick('skill', skill, index)}>
                                        <MdOutlineModeEditOutline className="edit-icon" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    <div className="field-group">
                        <label>About Me (500 word limit)</label>
                        <div className="about-me-container">
                            <textarea
                                className="about-me-field"
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                                onBlur={handleSaveField}
                                data-field="aboutMe"
                                placeholder="Write a small paragraph about your game! What gets the player/the mechanics across? Tell and inform the game to the student."
                                maxLength={500}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <label>Skills (eg. C++ Programmer)</label>
                        <div className="skills-container">
                            {skills.map((skill, index) => (
                                <div key={index} className="skill-item">
                                    <input
                                        type="text"
                                        className="skill-field"
                                        value={skill}
                                        onChange={(e) => {
                                            const newSkills = [...skills];
                                            newSkills[index] = e.target.value;
                                            setSkills(newSkills);
                                        }}
                                        onBlur={handleSaveField}
                                        data-field="skills"
                                        data-index={index}
                                        placeholder={`Skill ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="field-group">
                        <label>Contact Email</label>
                        <div className="contact-field-container">
                            <div className="contact-field">{contactEmail}</div>
                            <div className="edit-icon-container" onClick={() => handleEditClick('contactEmail', contactEmail)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="field-group">
                        <label>Contact Phone</label>
                        <div className="contact-field-container">
                            <div className="contact-field">{contactPhone}</div>
                            <div className="edit-icon-container" onClick={() => handleEditClick('contactPhone', contactPhone)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="field-group">
                        <label>Personal Portfolio Link</label>
                        <div className="contact-field-container">
                            <div className="contact-field">{portfolioLink}</div>
                            <div className="edit-icon-container" onClick={() => handleEditClick('portfolioLink', portfolioLink)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section profile-preview">
                    <h3>Profile Preview</h3>
                    <p>This is how your profile will be viewed be others</p>

                    <div className="preview-container">
                        <div className="preview-header">
                            <div className="profile-picture">
                                <div className="profile-avatar"></div>
                            </div>
                            <div className="profile-info">
                                <div className="student-name">
                                    {studentName}
                                </div>
                                <div className="student-age">
                                    {studentAge}
                                </div>
                            </div>
                        </div>

                        <div className="preview-about">
                            <h4>About me</h4>
                            <p>{aboutMe}</p>
                        </div>

                        <div className="preview-projects">
                            <h4>Projects</h4>
                            <div className="projects-grid">
                                <div className="project-placeholder"></div>
                                <div className="project-placeholder"></div>
                            </div>
                        </div>

                        <div className="preview-contact">
                            <div className="contact-item">
                                <span className="contact-label">Email</span>
                                <span className="contact-value">{contactEmail}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">Phone</span>
                                <span className="contact-value">{contactPhone}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">Skills</span>
                                <div className="skills-preview">
                                    <div className="skill-tag">Skill 1</div>
                                    <div className="skill-tag">Skill 2</div>
                                    <div className="skill-tag">Skill 3</div>
                                    <div className="skill-tag">Skill 4</div>
                                </div>
                            </div>
                        </div>

                        <div className="view-portfolio-container">
                            <button className="view-portfolio-btn" onClick={handleViewPortfolio}>
                                View Portfolio
                            </button>
                        </div>
                    </div>
                </div>

                {editMode && (
                    <div className="edit-bg-sp">
                        <div className="edit-box-sp">
                            <h2>Edit {//editField === 'aboutMe' ? 'About Me' :
                                // editField === 'skill' ? 'Skill' :
                                editField === 'contactEmail' ? 'Contact Email' :
                                    editField === 'contactPhone' ? 'Contact Phone' :
                                        editField === 'portfolioLink' ? 'Portfolio Link' :
                                            editField === 'studentName' ? 'Student Name' :
                                                editField === 'studentAge' ? 'Student Age' : editField}</h2>
                            {editField === 'aboutMe' ? (
                                <textarea
                                    className="edit-textarea-sp"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    placeholder="Enter about me text"
                                    maxLength={500}
                                />
                            ) : (
                                <input
                                    className="edit-input-sp"
                                    type={editField === 'contactEmail' ? 'email' :
                                        editField === 'contactPhone' ? 'tel' :
                                            editField === 'portfolioLink' ? 'url' : 'text'}
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    placeholder={`Enter new ${editField}`}
                                />
                            )}
                            <div className="button-container-sp">
                                <button onClick={handleCancelEdit}>Cancel</button>
                                <button onClick={handleSaveEdit}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentProfile;