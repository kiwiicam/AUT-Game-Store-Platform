import react, { useEffect, useState, useRef } from "react";
import '../../css/UploadAssignment.css'
import axios from 'axios';
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router';

function UploadAssignment() {
    const navigate = useNavigate();

    const [gameName, setGameName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [gameDesc, setGameDesc] = useState("");
    const [projectType, setProjectType] = useState("Individual Game Project");
    const [groupMembers, setGroupMembers] = useState([])

    const [gameFile, setGameFile] = useState(null);
    const [imageArray, setImageArray] = useState([])

    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    useEffect(() => {
        //check if user is allowed first
    }, [])



    const handleImageDrop = (files) => {
        if (imageArray.length >= 3) return;
        setImageArray((prev) => [...prev, ...files]);
    }


    async function handleAssignmentUpload(){
        //to do.....

    }



    return (
        <div className="upload-div">
            <div className="inner-upload-div">
                <div>
                    <h1>Upload Assignments</h1>
                    <div>
                        <h2>This page is where you can upload assignments to be displayed on your student profile, please ensure only one student uploads the assignment per group.</h2>
                        <h2>Even if someone else uploads the assignment, aslong as they include you as a developer it will still show up on your profile.</h2>
                    </div>
                </div>
                <div>
                    <h3>Instructions</h3>
                    <h2>Please enter any relevant details about your project into sections below. Please ensure you fill out all the sections and keep your answers appropriate as this will be shown publicy once approved by an admin.</h2>
                </div>
                <div>
                    <h3>Folder Format</h3>
                    <h2>Please use the folder format provided, this will keep it consistent and allow users to download and play the game easier. If your file format does not follow this format it is likely to be declinded by an admin.</h2>
                </div>
                <div className="folder-format"></div>

                <div className="game-team-name">
                    <div>
                        <h3>Upload Game Projects</h3>
                        <h2>Upload your group/individual game project here.</h2>
                    </div>
                    <div className="top-half">
                        <div className="left-div">
                            <h2>Game Title</h2>
                            <input placeholder="Student game project title" type="text" onChange={(e) => setGameName(e.target.value)} />
                        </div>
                        <div className="right-div">
                            <h2>Team Name</h2>
                            <input placeholder="Student project team name" type="text" onChange={(e) => setTeamName(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <h2>About section (100 word limit)</h2>
                        <textarea
                            placeholder="Write a small paragraph about your game that gets the core mechanics across aswell as selling the game to the readers"
                            style={{ width: '100%', resize: 'none' }}
                            rows="6"
                        />
                    </div>
                    <div className="left-div">
                        <h2>Project Type</h2>
                        <select
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            style={{ color: '#0000006B' }}>
                            <option value="Individual Game Project">Individual Game Project</option>
                            <option value="Group Game Project">Group Game Project</option>
                        </select>
                    </div>
                    {projectType === "Group Game Project" ?
                        <div> </div>
                        :
                        <></>
                    }

                </div>
                <div className="file-upload-div">
                    <div className="center-stuff">
                        <div style={{ width: '95%' }}>
                            <h2>Upload your game file here</h2>
                        </div>
                        <div className="upload-box"
                            onDrop={(e) => { e.preventDefault(); setGameFile(e.dataTransfer.files[0]) }}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {!gameFile ?
                                <>
                                    <MdOutlineFileUpload className="upload-icon" />
                                    <h2>Drag a file here or</h2>
                                    <input ref={fileInputRef} onChange={(e) => { setGameFile(e.target.files[0]) }} className="hidden-file" type="file"></input>
                                    <div className="input-button" onClick={() => { fileInputRef.current.click() }}><h2>Click to select a file</h2></div>
                                </>
                                : <><h2>{gameFile.name}</h2></>}
                        </div>
                        <div className="clear-button" onClick={() => setGameFile(null)}><h2>Clear files</h2></div>
                    </div>
                    <div className="center-stuff">
                        <div style={{ width: '95%' }}>
                            <h2>Upload your Image files here (Exactly 3 Images)</h2>
                        </div>
                        <div className="upload-box"
                            onDrop={(e) => { e.preventDefault(); handleImageDrop(e.dataTransfer.files) }}
                            onDragOver={(e) => e.preventDefault() /*Important to do as without it will open the file in a new tab*/}
                        >
                            {imageArray.length < 1 ?
                                <>
                                    <MdOutlineFileUpload className="upload-icon" />
                                    <h2>Drag a file here or</h2>
                                    <input ref={imageInputRef}
                                        onChange={(e) => { e.preventDefault(); handleImageDrop(e.target.files) }}
                                        className="hidden-file" type="file"
                                        multiple></input>
                                    <div className="input-button" onClick={() => { imageInputRef.current.click() }}><h2>Click to select a file</h2></div>
                                </>
                                :
                                <>
                                    {imageArray.map((value, i) => (
                                        <h2 key={i}>{value.name}</h2>
                                    ))}
                                </>
                            }
                        </div>
                        <div className="clear-button" onClick={() => { setImageArray([]) }}><h2>Clear files</h2></div>
                    </div>
                    <div className="bottom-buttons">
                        <button onClick={() => {navigate("/")}}>Cancel Upload Request</button>
                        <button onClick={() => handleAssignmentUpload()}>Submit Upload Request</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UploadAssignment;