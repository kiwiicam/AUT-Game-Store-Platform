import React from "react";
import '../css/Genrebox.css';

function Genrebox({ genre, onClick }) {
    return (
        <div className="genrebox" onClick={onClick}>
            <p>{genre}</p>
            <div className="genre-icon">
                <img src={'http://localhost:3000/genre_icons/' + genre.toLowerCase().toString().replace(/\s+/g, '') + '.png'} />
            </div>
        </div>
    );
}

export default Genrebox;