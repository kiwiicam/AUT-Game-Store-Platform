import React, { useEffect } from 'react'
import '../css/Homepage.css'

function Homepage() {
    useEffect(() => {
        // This is where you can fetch data for the homepage, like featured games
    }, [])
    return (
        <div className='homepage-background'>
            <div className='homepage-content'>
                <h1>Featured</h1>
                <div className='split-line'></div>
            </div>
        </div>
    )
}

export default Homepage
