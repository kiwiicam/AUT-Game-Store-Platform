import React, { useEffect, useState } from "react";

import '../../css/ManageUploads.css'
import ManageuploadCard from "../ManageuploadCard";
function ManageUploads() {

    const [uploadRequests, setUploadRequests] = useState([])
    var denyList = []
    var approveList = []
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

    const handleList = (game, type) => {
        if (type === "deny") {
            if (denyList.includes(game)) {
                denyList = denyList.filter(item => item !== game);
                return
            }
            denyList.push(game);
            return
        }
        if (type === "approve") {
            if (approveList.includes(game)) {
                approveList = approveList.filter(item => item !== game);
                return
            }
            approveList.push(game);
            return
        }
        alert("error")
    }

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
                            <ManageuploadCard type={item.type} account={item.account} pfp={item.pfp} date={item.date} id={index} key={index} func={handleList} />
                        ))

                        }
                    </div>
                </div>
            </div>
            <button onClick={() => alert(denyList)}></button>
            <button onClick={() => alert(approveList)}></button>
        </div>
    )
}

export default ManageUploads