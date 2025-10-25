import React, { useEffect, useState, useCallback } from "react";
import '../../css/StudentProfile.css';
import { MdOutlineModeEditOutline, MdAdd, MdRemove } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Developercard from "../Developercard";

function StudentProfile() {

    const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api";

    const [aboutMe, setAboutMe] = useState('');
    const [skills, setSkills] = useState(['', '', '', '']);
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [portfolioLink, setPortfolioLink] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentAge, setStudentAge] = useState('');


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const uid = localStorage.getItem('uid');
                if (!uid) {
                    toast.error("User not logged in");
                    return;
                }

                const response = await axios.post(`${backend_url}/database/getstudentinfo`, {
                    uid
                });
                const skillsFromDb = response.data.correctData.skills;
                setAboutMe(response.data.correctData.aboutMe || "About section not set");
                setSkills(Array.isArray(skillsFromDb) && skillsFromDb.length > 0 ? skillsFromDb : ['Skill not set', 'Skill not set', 'Skill not set', 'Skill not set']);
                setContactEmail(response.data.correctData.contactEmail || "Email not set");
                setContactPhone(response.data.correctData.contactPhone || "Phone not set");
                setPortfolioLink(response.data.correctData.portfolioLink || "Portfolio link not set");
                setStudentName(response.data.correctData.studentName || "Name not set");
                setStudentAge(response.data.correctData.studentAge || "Age not set");
                console.log(response.data.correctData.skills);
            } catch (error) {
                toast.error("Failed to load user data");
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const uid = localStorage.getItem('uid');
            if (!uid) {
                toast.error("User not logged in");
                return;
            }

            if (handleChecks() === false) {
                return;
            }
            await axios.post(`${backend_url}/database/updatestudentinfo`, {
                uid,
                aboutMe,
                skills,
                contactEmail,
                contactPhone,
                portfolioLink,
                studentName,
                studentAge
            });

            toast.success("User data updated successfully");
        } catch (error) {
            toast.error("Failed to update user data");
        }
    };

    const handleChecks = () => {

        return true;
    }

    return (
        <div className="student-profile-container">
            <div className="student-profile">
                <ToastContainer />

                <div className="header">
                    <h1>Student Profile</h1>
                    <h2>Manage your gamecard information here</h2>
                </div>
                <div className="section displayed-information">
                    <div className="field-group-1">
                        <label>Personal Details</label>
                        <div className="personal-details-container">
                            <input
                                onFocus={() => setStudentName('')}
                                value={studentName}
                                placeholder="Your name"
                                className="edit-input-sp"
                                onChange={(e) => setStudentName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="personal-details-container">
                            <input
                                onFocus={() => setStudentAge('')}
                                onChange={(e) => setStudentAge(e.target.value)}
                                value={studentAge}
                                placeholder="Your age"
                                className="edit-input-sp"
                            />
                        </div>
                    </div>

                    <div className="field-container">
                        <label>About Me (200 Character limit)</label>
                        <textarea
                            placeholder="Write a small paragraph about yourself..."
                            value={aboutMe}
                            onChange={(e) => setAboutMe(e.target.value)}
                            onFocus={() => setAboutMe('')}
                            maxLength={200}
                        />
                    </div>

                    <div className="field-container-2">
                        <label>Skills (eg. C++ Programmer)</label>
                        {skills.map((skill, i) => (
                            <input
                                key={i}
                                value={skill}
                                placeholder={`Skill ${i + 1}`}
                                className="edit-input-sp"
                                onFocus={() => {
                                    const newSkills = [...skills];
                                    newSkills[i] = '';
                                    setSkills(newSkills);
                                }}
                                onChange={(e) => {
                                    const newSkills = [...skills];
                                    newSkills[i] = e.target.value;
                                    setSkills(newSkills);
                                }}
                            />
                        ))}
                    </div>

                    <div className="field-group-1">
                        <label>Contact Email</label>
                        <input
                            onFocus={() => setContactEmail('')}
                            onChange={(e) => setContactEmail(e.target.value)}
                            value={contactEmail}
                            placeholder="Your email"
                            className="edit-input-sp"
                        />
                    </div>

                    <div className="field-group-1">
                        <label>Contact Phone</label>
                        <input
                            onFocus={() => setContactPhone('')}
                            onChange={(e) => setContactPhone(e.target.value)}
                            value={contactPhone}
                            placeholder="Your phone"
                            className="edit-input-sp"
                        />
                    </div>

                    <div className="field-group-1">
                        <label>Personal Portfolio Link</label>
                        <input
                            onFocus={() => setPortfolioLink('')}
                            onChange={(e) => setPortfolioLink(e.target.value)}
                            value={portfolioLink}
                            placeholder="Your portfolio link"
                            className="edit-input-sp"
                        />
                    </div>
                    <button className="save-profile" onClick={() => handleSave()}>
                        Save Changes?
                    </button>

                </div>

                <div className="section profile-preview">
                    <h3>Profile Preview</h3>
                    <p>This is how your profile will be viewed by others</p>

                    <Developercard
                        name={studentName === '' ? 'Name not set' : studentName}
                        age={studentAge === '' ? 'Age not set' : studentAge}
                        picture={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        about={aboutMe === '' ? 'About me section not set' : aboutMe}
                        projects={[]}
                        email={contactEmail === '' ? 'Email not set' : contactEmail}
                        phone={contactPhone === '' ? 'Phone not set' : contactPhone}
                        skills={skills.length === 0 ? ['Skill not set'] : skills}
                        link={portfolioLink === '' ? '' : portfolioLink}
                        forGame={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;