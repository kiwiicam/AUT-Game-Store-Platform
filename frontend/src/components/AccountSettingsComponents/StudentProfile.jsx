import React, { useEffect, useState, useCallback } from "react";
import '../../css/StudentProfile.css';
import { MdOutlineModeEditOutline, MdAdd, MdRemove } from "react-icons/md";
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
    const [projects, setProjects] = useState([{ image: '', link: '', title: '' }]);

    const [editMode, setEditMode] = useState(false);
    const [editField, setEditField] = useState('');
    const [editValue, setEditValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    //Debounce timer
    const [saveTimer, setSaveTimer] = useState(null);

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
                setProjects(response.data.projects || [{ image: '', link: '', title: 'Project 1' }]);
            } catch (error) {
                toast.error("Failed to load user data");
            }
        };

        fetchUserData();
    }, []);

    //Auto-save function with debounce
    const autoSave = useCallback(async (field, value) => {
        try {
            const uid = localStorage.getItem('uid');
            let updateData = { uid };

            if (field === 'aboutMe') {
                updateData.aboutMe = value;
            } else if (field === 'skills') {
                updateData.skills = value;
            } else if (field === 'projects') {
                updateData.projects = value;
            }

            await axios.post('http://localhost:8000/api/database/updatestudentprofile', updateData);
            toast.success("Changes saved automatically", {
                position: 'top-center',
                autoClose: 2000,
            });
        } catch (error) {
            toast.error("Failed to save changes", {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    }, []);

    //Handle About Me change with debounce
    const handleAboutMeChange = (e) => {
        const newValue = e.target.value;
        setAboutMe(newValue);

        //Clear existing timer
        if (saveTimer) {
            clearTimeout(saveTimer);
        }

        //Set new timer for auto-save (10 seconds after user stops typing)
        const timer = setTimeout(() => {
            autoSave('aboutMe', newValue);
        }, 10000);

        setSaveTimer(timer);
    };

    //Handle Skills change with debounce
    const handleSkillChange = (index, value) => {
        const newSkills = [...skills];
        newSkills[index] = value;
        setSkills(newSkills);

        //Clear existing timer
        if (saveTimer) {
            clearTimeout(saveTimer);
        }

        //Set new timer for auto-save (5 seconds after user stops typing)
        const timer = setTimeout(() => {
            autoSave('skills', newSkills);
        }, 5000);

        setSaveTimer(timer);
    };

    //Handle Projects change with debounce
    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index] = {
            ...newProjects[index],
            [field]: value
        };
        setProjects(newProjects);

        //Clear existing timer
        if (saveTimer) {
            clearTimeout(saveTimer);
        }

        //Set new timer for auto-save (5 seconds after user stops typing)
        const timer = setTimeout(() => {
            autoSave('projects', newProjects);
        }, 5000);

        setSaveTimer(timer);
    };

    const handleEditClick = (field, value, index = null) => {
        setEditField(field);
        setEditValue(value || '');
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

    const handleViewPortfolio = () => {
        window.open(portfolioLink, '_blank');
    };

    const handleProjectImageClick = (projectLink) => {
        if (projectLink) {
            window.open(projectLink, '_blank');
        } else {
            toast.info("No project link set");
        }
    };

    const addProject = () => {
        if (projects.length < 6) { // Limit to 6 projects
            const newProject = {
                image: '',
                link: '',
                title: `Project ${projects.length + 1}`
            };
            const newProjects = [...projects, newProject];
            setProjects(newProjects);
            autoSave('projects', newProjects);
        } else {
            toast.info("Maximum of 6 projects allowed");
        }
    };

    const removeProject = (index) => {
        if (projects.length > 1) {
            const newProjects = projects.filter((_, i) => i !== index);
            setProjects(newProjects);
            autoSave('projects', newProjects);
        } else {
            toast.info("At least one project is required");
        }
    };

    //Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (saveTimer) {
                clearTimeout(saveTimer);
            }
        };
    }, [saveTimer]);

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
                            <div className="personal-details-field">{studentName}</div>
                            <div className="edit-icon-container" onClick={() => handleEditClick('studentName', studentName)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="personal-details-container">
                            <div className="personal-details-field">{studentAge}</div>
                            <div className="edit-icon-container" onClick={() => handleEditClick('studentAge', studentAge)}>
                                <MdOutlineModeEditOutline className="edit-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="field-container">
                        <label>About Me (500 word limit)</label>
                        <textarea
                            placeholder="Write a small paragraph about yourself..."
                            value={aboutMe}
                            onChange={handleAboutMeChange}
                            onFocus={() => setAboutMe('')}
                            maxLength={500}
                        />
                    </div>

                    <div className="field-container-2">
                        <label>Skills (eg. C++ Programmer)</label>
                        {skills.map((skill, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Skill ${index + 1}`}
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                onFocus={() => {
                                    const newSkills = [...skills];
                                    newSkills[index] = '';
                                    setSkills(newSkills);
                                }}
                            />
                        ))}
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

                    {/* Projects Section - Updated with inline text boxes */}
                    <div className="field-container-projects">
                        <label>Projects</label>
                        {projects.map((project, index) => (
                            <div key={index} className="project-item">
                                <div className="project-header">
                                    <div className="project-title-container">
                                        <input
                                            type="text"
                                            placeholder="Project Title"
                                            value={project.title}
                                            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                            onFocus={() => {
                                                const newProjects = [...projects];
                                                newProjects[index].title = '';
                                                setProjects(newProjects);
                                            }}
                                            className="project-title-input"
                                        />
                                    </div>
                                    {projects.length > 1 && (
                                        <button
                                            className="remove-project-btn"
                                            onClick={() => removeProject(index)}
                                        >
                                            <MdRemove className="remove-icon" />
                                        </button>
                                    )}
                                </div>
                                <div className="project-fields">
                                    <div className="project-field-container">
                                        <div className="project-field-label">Image URL</div>
                                        <input
                                            type="text"
                                            placeholder="Enter image URL"
                                            value={project.image}
                                            onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                                            onFocus={() => {
                                                const newProjects = [...projects];
                                                newProjects[index].image = '';
                                                setProjects(newProjects);
                                            }}
                                        />
                                    </div>
                                    <div className="project-field-container">
                                        <div className="project-field-label">Project Link</div>
                                        <input
                                            type="text"
                                            placeholder="Enter project link"
                                            value={project.link}
                                            onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                                            onFocus={() => {
                                                const newProjects = [...projects];
                                                newProjects[index].link = '';
                                                setProjects(newProjects);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="add-project-btn-container">
                            <button onClick={addProject}>
                                <MdAdd className="add-icon"  />
                                Add Project
                            </button>
                        </div>
                    </div>
                </div>

                <div className="section profile-preview">
                    <h3>Profile Preview</h3>
                    <p>This is how your profile will be viewed by others</p>

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
                            <p style={{ whiteSpace: 'pre-wrap' }}>{aboutMe}</p>
                        </div>

                        <div className="preview-projects">
                            <h4>Projects</h4>
                            <div className="projects-grid">
                                {projects.map((project, index) => (
                                    <div
                                        key={index}
                                        className={`project-image ${project.image ? 'has-image' : ''} ${project.link ? 'clickable' : ''}`}
                                        onClick={() => handleProjectImageClick(project.link)}
                                        style={{
                                            backgroundImage: project.image ? `url(${project.image})` : 'none',
                                            cursor: project.link ? 'pointer' : 'default'
                                        }}
                                    >
                                        {!project.image && (
                                            <div className="project-placeholder-content">
                                                <span>{project.title || `Project ${index + 1}`}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
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
                                    {skills.map((skill, index) => (
                                        skill && <div key={index} className="skill-tag">{skill}</div>
                                    ))}
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
                            <h2>
                                {editField === 'contactEmail' ? 'Contact Email' :
                                    editField === 'contactPhone' ? 'Contact Phone' :
                                        editField === 'portfolioLink' ? 'Portfolio Link' :
                                            editField === 'studentName' ? 'Student Name' :
                                                editField === 'studentAge' ? 'Student Age' : editField}
                            </h2>
                            <input
                                className="edit-input-sp"
                                type={editField === 'contactEmail' ? 'email' :
                                    editField === 'contactPhone' ? 'tel' :
                                        editField === 'portfolioLink' ? 'url' : 'text'}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                placeholder={`Enter ${editField === 'contactEmail' ? 'contact email' :
                                    editField === 'contactPhone' ? 'contact phone' :
                                        editField === 'portfolioLink' ? 'portfolio link' :
                                            editField === 'studentName' ? 'student name' :
                                                editField === 'studentAge' ? 'student age' : editField}`}
                            />
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