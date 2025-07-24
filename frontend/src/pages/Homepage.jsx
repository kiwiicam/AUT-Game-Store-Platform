import React, { useEffect } from 'react'
import '../css/Homepage.css'
import Gamecard from '../components/Gamecard'

function Homepage() {
    useEffect(() => {
        // This is where you can fetch data for the homepage, like featured games
    }, [])

    return (
        <div className='homepage-background'>
            <div className='homepage-content'>
                <h1>Featured</h1>
                <div className='split-line'></div>
                <div className='featured-games-slider'>

                </div>
                <h1>Recent student releases</h1>
                <div className='split-line'></div>
                <div className='game-cards'>
                    <Gamecard image="http://localhost:3000/exampleimage.jpg" title="Cyberpunk 2077" creator="CD Projekt" />
                    <Gamecard image="https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg" title="GTA 5" creator="Rockstar Games" />
                    <Gamecard image="https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd" title="Skyrim: The Elden Scrolls V" creator="Bethesda Game Studios" />
                    <Gamecard image="http://localhost:3000/joshgame.png" title="Josh's game" creator="Joshua Knight" />
                </div>

            </div>
        </div>
    )
}

export default Homepage
