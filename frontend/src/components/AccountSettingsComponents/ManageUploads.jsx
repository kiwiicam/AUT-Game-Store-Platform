import React, { useEffect, useState } from "react";

function ManageUploads() {

    const [uploadRequests, setUploadRequests] = useState([])

    useEffect(() => {

    }, []);

    return (
        <div className="manage-uploads-main">
            <div className="top-uploads">
                <h1>Manage Upload Requests</h1>
                <h2>View student upload requests and approve or deny them.</h2>
            </div>
            <div className="bottom-uploads">
                <div className="scrollable-uploads">
                    <h3>Requests</h3>
                    <div className="thin-grey-line"></div>
                </div>
            </div>
        </div>
    )
}

export default ManageUploads