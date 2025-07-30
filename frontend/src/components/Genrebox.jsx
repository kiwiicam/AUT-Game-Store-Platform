import React from "react";
import '../css/Genrebox.css';

function Genrebox({ genre, onClick }) {
    return (
        <div className="genrebox" onClick={onClick}>
            <p>{genre}</p>
        </div>
    );
}

export default Genrebox;