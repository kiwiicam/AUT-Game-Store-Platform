import React, { useEffect } from 'react'

function Gamepage({ gameName }) {
    useEffect(() => {
        // This is where you can fetch data for the game page, like game details 
    }, []);
    return (
        <div>
            <h1>Gamepage</h1>
            <p>This is the page where the game information will be displayed</p>
        </div>
    )
}

export default Gamepage
