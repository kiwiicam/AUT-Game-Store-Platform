import React, { useState } from 'react'
import '../css/MangeuploadCard.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router';
function ManageuploadCard({ account, type, date, pfp, id }) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    return (
        <>
            <div className="outer-item">
                <div className="upload-item">
                    <div className="account-cell">
                        <div className="pfp-manage"><img src={pfp}></img></div>
                        <h2>{account}</h2>
                    </div>
                    <h2>{type}</h2>
                    <h2>{date}</h2>

                </div>
                <BsThreeDotsVertical style={{ color: "lightgray", cursor: "pointer" }} onClick={() => setSelected((prev) => !prev)} />
                {selected ?
                    <div className='approve-game-container'>
                        <div className='approve-div' onClick={()=> navigate('/admin/minecraft')}>
                            <h2>Preview Game Page</h2>
                        </div>
                        <div className='approve-div'>
                            <h2>Approve game</h2>
                        </div>
                        <div className='approve-div'>
                            <h2>Deny Game</h2>
                        </div>
                    </div> : <></>}
            </div>
            <div className="thin-grey-line"></div>

        </>
    )
}

export default ManageuploadCard
