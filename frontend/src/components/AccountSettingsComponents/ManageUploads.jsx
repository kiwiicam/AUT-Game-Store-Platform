import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/ManageUploads.css";
import ManageuploadCard from "../ManageuploadCard";

function ManageUploads({ setActiveCom }) {
    const backend_url = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api";

    const [uploadRequests, setUploadRequests] = useState([]);
    const [denyList, setDenyList] = useState([]);
    const [approveList, setApproveList] = useState([]);
    const [selectedStates, setSelectedStates] = useState({});

    useEffect(() => {
        const getGameItems = async () => {
            try {
                const uploads = await axios.get(`${backend_url}/database/admingames`);
                const mappedGames = uploads.data.games.map((game) => ({
                    account: game.username || "Unknown User",
                    type: game.projectType,
                    date: game.releaseDate,
                    gameName: game.gameName,
                    pfp: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }));
                setUploadRequests(mappedGames);
            } catch (err) {
                alert(err.message);
            }
        };

        getGameItems();
    }, []);

    const handleList = (game, type) => {
        setSelectedStates((prev) => {
            const newState = { ...prev };

            if (type === "approve") {
                if (newState[game]?.approve) {
                    delete newState[game];
                    setApproveList((prev) => prev.filter((item) => item !== game));
                } else {
                    newState[game] = { approve: true, deny: false };
                    setApproveList((prev) => [...prev.filter((item) => item !== game), game]);
                    setDenyList((prev) => prev.filter((item) => item !== game));
                }
            } else if (type === "deny") {
                if (newState[game]?.deny) {
                    delete newState[game];
                    setDenyList((prev) => prev.filter((item) => item !== game));
                } else {
                    newState[game] = { approve: false, deny: true };
                    setDenyList((prev) => [...prev.filter((item) => item !== game), game]);
                    setApproveList((prev) => prev.filter((item) => item !== game));
                }
            }

            return newState;
        });
    };

    const makeChanges = async () => {
        if (denyList.length >= 1) {
            try {
                await axios.post(`${backend_url}/database/denygames`, denyList);
            } catch (err) {
                alert(err.message);
            }
        }
        if (approveList.length >= 1) {
            try {
                await axios.post(`${backend_url}/database/approvegames`, approveList);
            } catch (err) {
                alert(err.message);
            }
        }

        // Remove approved or denied games from the list after changes
        const filteredRequests = uploadRequests.filter(
            (request) =>
                !approveList.includes(request.gameName) && !denyList.includes(request.gameName)
        );

        setUploadRequests(filteredRequests);
        setDenyList([]);
        setApproveList([]);
        setSelectedStates({});
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
                        {uploadRequests.map((item) => (
                            <ManageuploadCard
                                key={item.gameName}
                                type={item.type}
                                account={item.account}
                                pfp={item.pfp}
                                date={item.date}
                                func={handleList}
                                gameName={item.gameName}
                                selected={selectedStates[item.gameName]}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="end-button">
                <h2 onClick={() => setActiveCom()}>Recently Deleted</h2>
                <button onClick={makeChanges}>Confirm Changes?</button>
            </div>
        </div>
    );
}

export default ManageUploads;
