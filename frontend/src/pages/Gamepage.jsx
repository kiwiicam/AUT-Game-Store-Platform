import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SlLike } from "react-icons/sl";
import '../css/Gamepage.css'


function Gamepage() {
    const { slug } = useParams();
    useEffect(() => {
        // This is where you can fetch data for the game page, like game details 
    }, []);
    return (
        <div className='gamepage-container'>
            <div className='gamepage-inner'>
                <div className='gamepage-header-container'>
                    <div className='gamepage-header'>
                        <h1>Minecraft</h1>
                        <h2>This is the page where the game information will be displayed</h2>
                    </div>
                    <div className='gamepage-likes'>
                        <p>462</p>
                        <div className='gamepage-like-icon'><SlLike /></div>
                    </div>
                </div>
                <div className='gamepage-info'>
                    <div className='gamepage-slider'>
                        <div className='gamepage-slider-top'>
                            

                        </div>
                        <div className='gamepage-slider-bottom'>
                            <div className='gamepage-slider-button-left'> </div>
                            <div className='gamepage-slider-indicators'>

                            </div>
                            <div className='gamepage-slider-button-right'> </div>
                        </div>
                    </div>
                    <div className='gamepage-sidebar'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gamepage
