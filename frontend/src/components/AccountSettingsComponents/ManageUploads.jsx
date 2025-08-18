import React, { useEffect, useState } from "react";

import '../../css/ManageUploads.css'
import ManageuploadCard from "../ManageuploadCard";
function ManageUploads() {

    const [uploadRequests, setUploadRequests] = useState([])
    useEffect(() => {

        setUploadRequests(
            [
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
                { account: "Blaine Mcdonald", type: "Team Game Project", date: "August 13, 2025", pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
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
                <h3>Requests</h3>
                <div className="what">
                    <h2>Account</h2>
                    <h2>Assignment</h2>
                    <h2>Date Requested</h2>
                </div>
                <div className="thin-grey-line"></div>
                <div className="scroll-overflow">
                    <div className="scroll-manage-uploads">
                        {uploadRequests.map((item, index) => (
                            <ManageuploadCard type={item.type} account={item.account} pfp={item.pfp} date={item.date} id={index} key={index} />
                        ))

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageUploads