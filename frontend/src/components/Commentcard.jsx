import react from "react";
import "../css/Commentcard.css"
function Commentcard({ text, name, picsrc, date }) {
    return (
        <div className="comment-card">
            <div className="left-section">
                <div className="profile-pic">
                    <img src={picsrc} alt={name} />
                </div>

                <h2 className="small">{name}</h2>
            </div>
            <div className="right-section">
                <div className="comment-info">
                    <h3>Review by {name}</h3>
                    <h2>Date posted: {date}</h2>
                </div>
                <p>{text}</p>
            </div>

        </div>
    );
}

export default Commentcard
