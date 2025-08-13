import React, { useEffect, useState } from "react";

function ManageUploads() {

    const [uploadRequests, setUploadRequests] = useState([])

    useEffect(() => {

        setUploadRequests(
            [
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025" }
            ]
        )

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
                    <div className="what"></div>
                    <div className="thin-grey-line"></div>
                    <div className="scroll-manage-uploads">
                        {uploadRequests.map((item, index) => (
                            <>
                                <div className="upload-item" key={index}>
                                    <h2>{item.account}</h2>
                                    <h2>{item.type}</h2>
                                    <h2>{item.date}</h2>
                                </div>
                                <div className="thin-grey-line"></div>
                            </>
                        ))

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageUploads