import react, { useEffect, useState, useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';
import '../../css/UploadAssignment.css'
import axios from 'axios';
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router';
import { FaSearch } from "react-icons/fa";
import SearchPersonCard from "../SearchPersonCard";
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";


function UploadAssignment() {
    const navigate = useNavigate();

    const [gameName, setGameName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [gameDesc, setGameDesc] = useState("");
    const [projectType, setProjectType] = useState("Individual Game Project");
    const [projectTimeframe, setProjectTimeframe] = useState(1);
    const [gameFile, setGameFile] = useState(null);
    const [imageArray, setImageArray] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [groupMembers, setGroupMembers] = useState([])
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const gameGenres = [
        "Action",
        "Adventure",
        "RPG",
        "Simulation",
        "Strategy",
        "Sports",
        "Racing",
        "Fighting",
        "Puzzle",
        "Platformer",
        "Shooter",
        "Survival",
        "Horror",
        "Sandbox",
        "Stealth",
        "MMORPG",
        "MOBA",
        "Battle Royale",
        "Metroidvania",
        "Rhythm",
        "Visual Novel",
        "Party",
        "Card Game",
        "Idle",
        "Roguelike",
        "Tower Defense",
        "Educational",
        "Turn-Based Tactics",
        "Interactive Story",
        "Text Adventure"
    ];



    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    useEffect(() => {

    }, [])


    async function handleSearchChange(search) {
        setSearch(search)
        if (search.trim() === "") {
            setIsSearching(false)
            return
        }
        setIsSearching(true);
        try {
            const response = await axios.post("http://localhost:8000/api/database/getusersearch", {
                searchQuery: search
            })
            setSearchResults(response.data.namelist)
        }
        catch (err) {
            alert(err.message)
        }
    }

    const handleImageDrop = (files) => {
        if (imageArray.length >= 3) return;
        setImageArray((prev) => [...prev, ...files]);
    }

    function checkGameDesc() {
        if (gameDesc.trim() === "") {
            toast.error('Your description cannot be blank', {
                position: 'top-center', autoClose: 3000,
            });
            return false
        }
        const wordCount = gameDesc.split(" ")
        if (wordCount.length < 100) {
            return true
        }
        toast.error('Error your description word count is greater than 100!', {
            position: 'top-center', autoClose: 3000,
        });
        return false
    }

    function checkGameName() {
        if (gameName.trim() === "") {
            toast.error('Your game name cannot be blank!', {
                position: 'top-center', autoClose: 3000,
            });
            return false
        }
        if (gameName.length > 30) {
            toast.error('Your game name is too long!', {
                position: 'top-center', autoClose: 3000,
            });
            return false
        }
        return true;

    }

    function checkTeamName() {
        if (teamName.trim() === "") {
            toast.error('Your team name cannot be blank!', {
                position: 'top-center', autoClose: 3000,
            });
            return false
        }
        if (teamName.length > 30) {
            toast.error('Your team name is too long!', {
                position: 'top-center', autoClose: 3000,
            });
            return false
        }
        return true;
    }

    function checkProjectType() {
        if (projectType.trim() === "") {
            toast.error('Please select a project type!', {
                position: 'top-center', autoClose: 3000,
            });
            return false
        }
        return true
    }

    function checkProjectTimeframe() {
        const value = Number(projectTimeframe);

        if (isNaN(value)) {
            toast.error('Project timeframe must be a number!', {
                position: 'top-center',
                autoClose: 3000,
            });
            return false;
        }

        if (value < 1 || value > 12) {
            toast.error('Project timeframe must be between 1 and 12 weeks!', {
                position: 'top-center',
                autoClose: 3000,
            });
            return false;
        }

        return true;
    }

    function checkTeamMembers() {
        if (groupMembers.length < 1 || groupMembers.length > 5) {
            toast.error('Please select between 1 and 5 team members to add to your project!', {
                position: 'top-center',
                autoClose: 3000,
            });
            return false
        }
        return true

    }


    function checkGameFile() {
        if (!gameFile) {
            toast.error('Please upload your game folder as a .zip!', {
                position: 'top-center',
                autoClose: 3000,
            });
            return false
        }
        return true
    }

    function checkImageArray() {
        if (imageArray.length !== 3) {
            toast.error('Please upload exactly 3 images, these will be used on your game page!', {
                position: 'top-center',
                autoClose: 3000,
            });
            return false
        }
        return true
    }
    function checkSelectedGenres() {
        if (selectedGenres.length !== 3) {
            toast.error('Please select exactly 3 Genres that fit your game!', {
                position: 'top-center',
                autoClose: 3000,
            });
            return false
        }
        return true
    }

    async function handleAssignmentUploadFiles() {
        try {
            setLoading(true)
            const formDataFiles = new FormData();
            formDataFiles.append('gameName', gameName);
            formDataFiles.append('file', gameFile);
            const responseFile = await axios.post('http://localhost:8000/api/storage/uploadgame', formDataFiles,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    timeout: 0,
                });

            const formDataImages = new FormData();
            imageArray.forEach(image => {
                formDataImages.append('images', image);
            });
            formDataImages.append('gameName', gameName);

            const responseImage = await axios.post('http://localhost:8000/api/storage/uploadimages', formDataImages,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    timeout: 0,
                })

        }
        catch (error) {
            setLoading(false);
            toast.error('Sorry, an error occured uploading your game. Please try again later', {
                position: 'top-center',
                autoClose: 3000,
            });
            alert(error.message)

        }

    }

    async function handleAssignmentUploadDatabase() {
        if (!checkGameName() ||
            !checkTeamName() ||
            !checkGameDesc() ||
            !checkProjectTimeframe() ||
            !checkProjectType() ||
            !checkSelectedGenres() ||
            !checkImageArray() ||
            !checkGameFile) return;
        try {
            const sizeInMB = (gameFile.size / (1024 * 1024)).toFixed(2);
            const dataToSend = {
                gameName,
                teamName,
                projectType,
                projectTimeframe,
                gameDesc,
                selectedGenres,
                fileSize: sizeInMB
            };

            if (projectType === "Group Game Project") {
                if (checkTeamMembers() === false) {
                    return;
                }
                dataToSend.groupMembers = groupMembers

            }
            await handleAssignmentUploadFiles();
            const response = await axios.post('http://localhost:8000/api/database/uploadgameinfo', dataToSend)
            setLoading(false);
            toast.success('Your game has been successfully uploaded!', {
                position: 'top-center',
                autoClose: 3000,
            });
        } catch (error) {
            setLoading(false);
            toast.error('Sorry, an error occured uploading your game. Please try again later', {
                position: 'top-center',
                autoClose: 3000,
            });
        }


    }



    function addTeamMember(name) {
        if (groupMembers.length >= 5) return
        setGroupMembers((prev) => [...prev, { name }]);
    }

    function addGenre(genre) {

        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(item => item !== genre))
            return
        }

        if (selectedGenres.length >= 3) return

        setSelectedGenres((prev) => [...prev, genre])

        return

    }



    return (
        <div className="upload-div">
            <ToastContainer />
            {loading ? <ClipLoader color="#36d7b7" size={50} /> : <></>}
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
                            <input placeholder="Game Name" type="text" onChange={(e) => setGameName(e.target.value)} />
                        </div>
                        <div className="right-div">
                            <h2>Team Name</h2>
                            <input placeholder="Team Name" type="text" onChange={(e) => setTeamName(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <h2>About section (100 word limit)</h2>
                        <textarea
                            placeholder="Write a small paragraph about your game that gets the core mechanics across aswell as selling the game to the readers"
                            style={{ width: '100%', resize: 'none' }}
                            rows="6"
                            onChange={(e) => setGameDesc(e.target.value)}
                        />
                    </div>
                    <div className="container-left-div">
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
                        <div className="right-div">
                            <h2>Project Timeframe</h2>
                            <div className="number-div">
                                <input style={{ paddingLeft: "10px" }} type="number" min="1" max="12" value={projectTimeframe} onChange={(e) => setProjectTimeframe(e.target.value)} />
                                <h2>Week(s) to complete</h2>
                            </div>
                        </div>
                    </div>
                    {projectType === "Group Game Project" ?
                        <div className="search-container">
                            <div className="member-container">
                                <div style={{ width: "50%" }}>
                                    <div className="search-members">
                                        <input value={search} placeholder="Search Username" onChange={(e) => handleSearchChange(e.target.value)} className="search-box" />
                                        {isSearching ?
                                            <div className="searching-box">
                                                <div className="top-close"><IoMdClose onClick={() => { setSearch(""); setIsSearching(false) }} style={{ cursor: "pointer" }} /> </div>
                                                <div className="inner-searching-box">
                                                    {searchResults.map((result, i) => (
                                                        <SearchPersonCard src={result.src} name={result.name} add={addTeamMember} />
                                                    ))}
                                                </div>
                                            </div>
                                            : <></>}

                                    </div>
                                </div>
                                <div className="grid-layout">
                                    {groupMembers.map((member, i) => (
                                        <div className="member-card">
                                            <h2>{member.name}</h2>
                                            <IoMdClose style={{ cursor: "pointer" }} onClick={() => { setGroupMembers(prev => prev.filter(m => m.name !== member.name)) }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }

                </div>
                <div className="genre-section">
                    <h3>Game genres</h3>
                    <h2>Please select 3 genres your game fits into.</h2>
                    <div className="genre-selection">
                        {gameGenres.map((item, i) => (
                            <div className={selectedGenres.includes(item) ? "genre-item-selected" : "genre-item"} onClick={() => { addGenre(item) }} key={i}>
                                <h5>{item}</h5>
                            </div>
                        ))}
                    </div>
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
                                        <h2 key={i}>{value.name}z</h2>
                                    ))}
                                </>
                            }
                        </div>
                        <div className="clear-button" onClick={() => { setImageArray([]) }}><h2>Clear files</h2></div>
                    </div>
                    <div className="bottom-buttons">
                        <button onClick={() => { navigate("/") }}>Cancel Upload Request</button>
                        <button onClick={() => handleAssignmentUploadDatabase()}>Submit Upload Request</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UploadAssignment;