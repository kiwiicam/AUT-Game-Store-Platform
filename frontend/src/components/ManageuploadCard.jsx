import React, { useState } from 'react'
import '../css/MangeuploadCard.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router';
import { ImCross } from "react-icons/im";
import { ImCheckmark } from "react-icons/im";
function ManageuploadCard({ account, type, date, pfp, func, id, gameName }) {
    const navigate = useNavigate();
    const [selectedApprove, setSelectedApprove] = useState(false);
    const [selectedDeny, setSelectedDeny] = useState(false);

    const handleChange = (type) => {
        if (type === "approve") {
            if (selectedApprove) {
                setSelectedApprove(false)
                func(gameName, "approve")
                return
            }
            if (selectedDeny) {
                setSelectedDeny(false)
                setSelectedApprove(true)
                func(gameName, "deny")
                func(gameName, "approve")
                return
            }
            setSelectedApprove(true)
            func(gameName, "approve")
            return
        }
        if (type === "deny") {
            if (selectedDeny) {
                setSelectedDeny(false)
                func(gameName, "deny")
                return
            }
            if (selectedApprove) {
                setSelectedApprove(false)
                setSelectedDeny(true)
                func(gameName, "approve")
                func(gameName, "deny")
                return
            }
            setSelectedDeny(true)
            func(gameName, "deny")
            return

        }
    }

    return (
        <>
            <div className="outer-item">
                <div className="upload-item" onClick={() => navigate(`/admin/${gameName}`)}>
                    <div className="account-cell">
                        <div className="pfp-manage"><img src={pfp}></img></div>
                        <h2>{account}</h2>
                    </div>
                    <h2>{type}</h2>
                    <h2 style={{ marginLeft: "12px" }}>{date}</h2>

                </div>
                <div className='buttons'>
                    <div className={`approve ${selectedApprove ? "selected" : ""}`}>
                        <ImCheckmark className='icon-approve' onClick={() => handleChange("approve")} />
                    </div>
                    <div className={`deny ${selectedDeny ? "selected" : ""}`}>
                        <ImCross className='icon-approve' onClick={() => handleChange("deny")} />
                    </div>
                </div>
            </div>
            <div className="thin-grey-line"></div>

        </>
    )
}

export default ManageuploadCard
