import React from 'react'
import "../css/SearchPersonCard.css";
import { CiCirclePlus } from "react-icons/ci";

function SearchPersonCard({ src, name, add}) {
    return (
        <div className='card-main'>
            <div className='left-side-div'>
                <div className='pfp-circle'>
                    <img src={src}></img>
                </div>
                <h2>{name}</h2>
            </div>
            <CiCirclePlus style={{
                fontSize: "1.8rem",
                color: "#fff",
                marginRight: "10px",
                cursor: "pointer"
            }} 
            onClick={()=>{add(name)}}
            />
        </div>
    )
}

export default SearchPersonCard
