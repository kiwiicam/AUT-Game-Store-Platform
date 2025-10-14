import React from 'react';
import '../css/MangeuploadCard.css';
import { useNavigate } from 'react-router';
import { ImCross } from "react-icons/im";
import { ImCheckmark } from "react-icons/im";

function ManageuploadCard({ account, type, date, pfp, func, gameName, selected }) {
    const navigate = useNavigate();

    const handleChange = (type) => {
        func(gameName, type);
    };

    return (
        <>
            <div className="outer-item">
                <div className="upload-item" onClick={() => navigate(`/admin/${gameName}`)}>
                    <div className="account-cell">
                        <div className="pfp-manage">
                            <img src={pfp} alt="Profile" />
                        </div>
                        <h2>{account}</h2>
                    </div>
                    <h2>{type}</h2>
                    <h2 style={{ marginLeft: "12px" }}>{date}</h2>
                </div>
                <div className='buttons'>
                    <div className={`approve ${selected?.approve ? "selected" : ""}`}>
                        <ImCheckmark className='icon-approve' onClick={() => handleChange("approve")} />
                    </div>
                    <div className={`deny ${selected?.deny ? "selected" : ""}`}>
                        <ImCross className='icon-approve' onClick={() => handleChange("deny")} />
                    </div>
                </div>
            </div>
            <div className="thin-grey-line"></div>
        </>
    );
}

export default ManageuploadCard;
