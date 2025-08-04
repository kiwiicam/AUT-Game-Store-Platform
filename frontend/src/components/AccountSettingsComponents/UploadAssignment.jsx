import react, { useEffect, useState } from "react";
import '../../css/UploadAssignment.css'
import axios from 'axios';

function UploadAssignment() {

    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [imageArray, setImageArray] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [gameName, setGameName] = useState("");


    useEffect(() => {
        //check if user is allowed first
    }, [])



    const handleImageDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setImageArray(prev => [...prev, ...droppedFiles]);
    }

    async function HandleAssignmentUpload() {
        if (gameName.trim() === "") {
            alert("Please enter a game name.");
            return;
        }
        if (imageArray.length === 0) {
            alert("Please provide atleast 3 images")
            return;
        }
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        else {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append('gamename', gameName);
                formData.append('file', file);
                const response = await axios.post('http://localhost:8000/api/storage/uploadgame', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`Upload: ${percentCompleted}%`);
                        setData("Uploading game files progress: " + percentCompleted + "%")
                    },
                    timeout: 0,
                });
                console.log("Upload successful:", response.data);
                uploadImage();
                setLoading(false)

            }
            catch (error) {
                alert(error.message + " Error uploading game file");
                setLoading(false);
                setFile(null);
                return;
            }
        }
    }

    async function uploadImage() {
        const formData = new FormData();
        formData.append('gamename', gameName);
        imageArray.forEach((image) => {
            formData.append('images', image);
        });
        try {
            setData("Uploading images...");
            const response = await axios.post('http://localhost:8000/api/storage/uploadimages', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setData("Images uploaded successfully: " + response.data.message);
            uploadDatabaseInfo();
        } catch (error) {
            alert(error.message + "Error uploading images");
        }
    }

    async function uploadDatabaseInfo() {
        try {
            const response = await axios.post('http://localhost:8000/api/database/uploadgameinfo', {
                gameName: gameName,
                description: "This is a game uploaded by the user",
                developers: "Campbell and Campbell"
            });
            setFile(null);
            setLoading(false);
            setImageArray([]);
            setGameName("");
            setData("Game information uploaded successfully: " + response.data.message);
            alert("Game information uploaded successfully: " + response.data.message);
        } catch (error) {
            alert("Error uploading game information: " + error.message);
        }
    }



    return (
        <div className="upload-div">
            <div className="inner-upload-div">
                <h1>Upload Assignments</h1>
                <div>
                    <h2>This page is where you can upload assignments to be displayed on your student profile, please ensure only one student uploads the assignment per group.</h2>
                    <h2>Even if someone else uploads the assignment, aslong as they include you as a developer it will still show up on your profile.</h2>
                </div>
                <h3>Instructions</h3>
                <h2>Please enter any relevant details about your project into sections below. Please ensure you fill out all the sections and keep your answers appropriate as this will be shown publicy once approved by an admin.</h2>
                <h3>Folder Format</h3>
                <h2>Please use the folder format provided, this will keep it consistent and allow users to download and play the game easier. If your file format does not follow this format it is likely to be declinded by an admin.</h2>
                <div className="folder-format"></div>
                <div className="upload-inputs">
                    <h3>Upload Game Projects</h3>
                    <h2>Upload your group/individual game project here.</h2>
                    <div className="game-team-name">
                        <div>
                            <h2>Game Title</h2>
                            <input type="text" onChange={(e) => setGameName(e.target.value)} />
                        </div>
                        <div>
                            <h2>Game Title</h2>
                            <input type="text" onChange={(e) => setGameName(e.target.value)} />
                        </div>
                    </div>
                    <h2>Please drag and drop your game file into the box below</h2>
                    <input type="file" accept=".zip" onChange={(e) => setFile(e.target.files[0])} required />
                    
                    <div className="image-upload-box"
                        onDrop={(e) => handleImageDrop(e)}
                        onDragOver={(e) => e.preventDefault() /*Important to do as without it will open the file in a new tab*/}
                    >
                        {imageArray.length === 0 ? <h2>Drag & drop your images here</h2> :
                            <div className="image-list">
                                {imageArray.map((image, index) => (
                                    <h2 key={index}>{image.name}</h2>
                                ))}
                            </div>}
                    </div>
                    <button onClick={() => setImageArray([])}>Clear images</button>
                    <h2>Please keep in mind this upload must be checked and accepted by an admin before it is visibile, this may take some time.</h2>
                    <div className="upload-actions"> <button>Cancel Upload</button><button onClick={() => HandleAssignmentUpload()}>Upload Assignment</button></div>
                </div>
            </div>
        </div>
    );
}

export default UploadAssignment;