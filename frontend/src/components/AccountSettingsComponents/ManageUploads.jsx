import React, { useEffect, useState } from "react";
import axios from 'axios'

import '../../css/ManageUploads.css'
import ManageuploadCard from "../ManageuploadCard";
function ManageUploads() {

    const [uploadRequests, setUploadRequests] = useState([])
    const [denyList, setDenyList] = useState([]);
    const [approveList, setApproveList] = useState([]);
    useEffect(() => {

        const getGameItems = async () => {
            try {
                const uploads = await axios.get('http://localhost:8000/api/database/admingames')
                const mappedGames = uploads.data.games.map(game => ({
                    account: "Campbell",
                    type: game.projectType,
                    date: game.releaseDate,
                    gameName: game.gameName,
                    pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }));
                setUploadRequests(mappedGames)
            }
            catch (err) {
                alert(err.message)
            }

        }
        getGameItems();



    }, []);

    const makeChanges = async () => {
        if (denyList.length >= 1) {
            try {
                const result = axios.post('http://localhost:8000/api/database/denygames', denyList)
            }
            catch (err) {
                alert(err.message)
            }
        }
        if (approveList.length >= 1) {
            try {
                const result = axios.post('http://localhost:8000/api/database/approvegames', approveList)
            }
            catch (err) {
                alert(err.message)
            }
        }
        //then handle state change to remove the approved or denied games
        const filteredRequests = uploadRequests.filter(request =>
            !approveList.includes(request.gameName) && !denyList.includes(request.gameName)
        );

        setUploadRequests(filteredRequests)

        return
    }

    const handleList = (game, type) => {
        if (type === "deny") {
            setDenyList(prev =>
                prev.includes(game) ? prev.filter(item => item !== game) : [...prev, game]
            );
            return;
        }

        if (type === "approve") {
            setApproveList(prev =>
                prev.includes(game) ? prev.filter(item => item !== game) : [...prev, game]
            );
            return;
        }

        alert("error");
    };

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
                            <ManageuploadCard type={item.type} account={item.account} pfp={item.pfp} date={item.date} id={index} key={index} func={handleList} gameName={item.gameName} />
                        ))

                        }
                    </div>
                </div>
            </div>
            <div className="end-button">
                <button onClick={() => makeChanges()}>Confirm Changes?</button>
            </div>
        </div>
    )
}

export default ManageUploads