import React, { useEffect, useState } from 'react'
import '../../css/RecentlyDeleted.css';
import { useNavigate } from 'react-router';
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';

function RecentlyDeleted() {

    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

    const [data, setData] = useState([]);

    useEffect(() => {
        setData([
            { account: "Campbell", gameName: "Game 1", daysLeft: 15 },
            { account: "Alice", gameName: "Game 2", daysLeft: 10 },
            { account: "Bob", gameName: "Game 3", daysLeft: 5 },
            { account: "Diana", gameName: "Game 4", daysLeft: 20 },
            { account: "Eve", gameName: "Game 5", daysLeft: 25 },
            { account: "Eve", gameName: "Game 5", daysLeft: 25 },
            { account: "Eve", gameName: "Game 5", daysLeft: 25 },
            { account: "Eve", gameName: "Game 5", daysLeft: 25 }
        ])
    }, [])

    const restoreGame = async (gameName) => {

        try {
            //restore games
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
                <h2>Recently Deleted games will lay here for 30 days before being deleted automatically.</h2>
                <h2>You may restore games here which will move them back to manage uploads.</h2>
                <div className='thin-grey-line'></div>
            </div>



            <div className='scrollable-recent'>
                <div className='recent-content'>
                    <div className='recent-sticky'>
                        <div className='recent-headers'>
                            <h2 className='flex'>Account</h2>
                            <h2 className='flex'>Game Name</h2>
                            <h2 className='flex'>Days before deletion</h2>
                            <div className='flex'></div>
                        </div>
                        <div className='thin-grey-line'></div>
                    </div>
                    {data.map((item, index) => (
                        <div>
                            <div className='recent-item' key={index}>
                                <h4 className='flex'>{item.account}</h4>
                                <h4 className='flex'>{item.gameName}</h4>
                                <h4 className='flex'>{item.daysLeft}</h4>
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