import react, { useEffect, useState } from "react";
import '../../css/UploadAssignment.css'
import axios from 'axios';

function UploadAssignment() {

    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        //check if user is allowed first
    }, [])



    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(droppedFiles);
        console.log("Dropped files:", droppedFiles);
    };

    async function UploadAssignment() {
        if (files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }
        else {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append('file', files[0]);
                const response = await axios.post('http://localhost:8000/api/storage/uploadgame', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`Upload: ${percentCompleted}%`);
                        setData("Upload progress: " + percentCompleted + "%")
                    },
                    timeout: 0,
                });
                setFiles([]);
                setData("Complete!")
                setLoading(false);
                console.log("Upload successful:", response.data);

            }
            catch (error) {
                alert(error.message);
                setLoading(false);
                setFiles([]);
                return;
            }
        }
    }

    return (
        <div className="upload-div">
            <h1>Upload Assignments</h1>
            <h2>This page is where you can upload assignments to be displayed on your student profile, please ensure only one student uploads the assignment per group.</h2>
            <h2>Even if someone else uploads the assignment, aslong as they include you as a developer it will still show up on your profile.</h2>
            <div id="split-gap" className="split"></div>
            <h2>Please drag and drop your game file into the box below</h2>
            <div
                className={`upload-box ${isDragging ? 'dragover' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {files.length === 0 ? (
                    <div className="upload-instructions">
                        <h2>Drag & drop your game file into this box</h2>
                    </div>
                ) : (
                    <div className="file-list">

                        {files.map((file, index) => (
                            <h2 key={index}>{file.name}</h2>
                        ))}

                        <div className="clear-files-center"><button onClick={() => setFiles([])} className="clear-files">Clear files</button></div>
                    </div>
                )}
            </div>
            <h2>Please keep in mind this upload must be checked and accepted by an admin before it is visibile, this may take some time.</h2>
            <div className="upload-actions"> <button>Cancel Upload</button><button onClick={() => UploadAssignment()}>Upload Assignment</button></div>
                {data}
            {loading ? <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> : <></>}
        </div>
    );
}

export default UploadAssignment;