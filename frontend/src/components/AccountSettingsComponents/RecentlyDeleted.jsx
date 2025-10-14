import React, { useEffect, useState } from 'react'
import '../../css/RecentlyDeleted.css';
import { useNavigate } from 'react-router';
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';

function RecentlyDeleted() {

    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api/';

    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${backend_url}database/getPendingDeletionGames`);
                setData(response.data.games);
                console.table(response.data.games);
            }
            catch (err) {
                alert(err.message);
            }
        }

        fetchData();
    }, [])

    const restoreGame = async (gameName) => {

        try {
            //restore games
            const repsonse = await axios.post(`${backend_url}database/restoregame`, { gameName: gameName });
            const newData = data.filter(item => item.gameName !== gameName);
            setData(newData);
        }
        catch (err) {
            alert(err.message);
        }

    }

    return (
        <div className='recent-main'>
            <h1>Recently Deleted</h1>
            <div>
                <h2>Recently deleted games will remain here for 30 days before being permanently wiped. Games located here can be restored and move to "Manage Uploads".</h2>
                <div className='thin-grey-line'></div>
            </div>



            <div className='scrollable-recent'>
                <div className='recent-content'>
                    <div className='recent-sticky'>
                        <div className='recent-headers'>
                            <h2 className='flex'>Account</h2>
                            <h2 className='flex'>Game Name</h2>
                            <h2 className='flex'>Days till deletion</h2>
                            <div className='flex'></div>
                        </div>
                        <div className='thin-grey-line'></div>
                    </div>
                    {data.map((item, index) => (
                        <div>
                            <div className='recent-item' key={index}>
                                <h4 className='flex'>{item.username || "Unknown User"}</h4>
                                <h4 className='flex'>{item.gameName}</h4>
                                <h4 className='flex'>{Math.ceil((item.expires * 1000 - Date.now()) / (1000 * 60 * 60 * 24))} days left</h4>
                                <button className='flex' id='restore-button' onClick={() => restoreGame(item.gameName)}>Restore</button>

                            </div>
                            <div className='thin-grey-line'></div>
                        </div>
                    ))}
                </div>

            </div>
            <div className='back-button-admin' onClick={() => navigate('/account', { state: { fromManageUploads: true } })}>
                <IoMdArrowBack className='back-admin-game' />
            </div>
        </div>
    )
}

export default RecentlyDeleted