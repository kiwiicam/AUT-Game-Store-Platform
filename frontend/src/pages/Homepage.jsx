import React, { useEffect, useState, useRef } from 'react'
import '../css/Homepage.css'
import Gamecard from '../components/Gamecard'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router';
import axios from 'axios'
function Homepage() {

    const [featuredGames, setFeaturedGames] = useState([]);
    const [recentReleases, setRecentReleases] = useState([]);
    const [mostLiked, setMostLiked] = useState([]);
    const [index, setIndex] = useState(0);
    const [recentIndex, setRecentIndex] = useState(0);
    const [likedIndex, setLikedIndex] = useState(0);
    const navigate = useNavigate();

    const [width, setWidth] = useState(null);

    const sliderRef = useRef(null);
    useEffect(() => {
        // This is where you can fetch data for the homepage, like featured games
        setWidth((sliderRef.current.offsetWidth-45)/3)
        const fetchFeaturedGames = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/database/featuredgames')

                const featuredGamesReturn = response.data.featuredGames;
                setFeaturedGames(
                    [
                        {
                            src: featuredGamesReturn[0].src,
                            title: featuredGamesReturn[0].title,
                            desc: featuredGamesReturn[0].desc,
                            creator: featuredGamesReturn[0].creator
                        }
                        ,
                        {
                            src: featuredGamesReturn[1].src,
                            title: featuredGamesReturn[1].title,
                            desc: featuredGamesReturn[1].desc,
                            creator: featuredGamesReturn[1].creator
                        }
                        ,
                        {
                            src: featuredGamesReturn[2].src,
                            title: featuredGamesReturn[2].title,
                            desc: featuredGamesReturn[2].desc,
                            creator: featuredGamesReturn[2].creator
                        }
                    ]
                );
            }
            catch (error) {
                alert(error.message)
                console.error("Error fetching featured games:", error);
            }
        }
        fetchFeaturedGames();



        setRecentReleases([
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games" },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios" },
            { image: "http://localhost:3000/joshgame.png", title: "Josh's game", creator: "Joshua Knight" },
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games" },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios" },
            { image: "http://localhost:3000/joshgame.png", title: "Josh's game", creator: "Joshua Knight" }
        ]);

        setMostLiked([
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games" },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios" },
            { image: "http://localhost:3000/joshgame.png", title: "Josh's game", creator: "Joshua Knight" },
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games" },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios" },
            { image: "http://localhost:3000/joshgame.png", title: "Josh's game", creator: "Joshua Knight" }
        ]);
    }, [])





    return (
        <div className='homepage-background'>
            <div className='homepage-content'>
                <div className='featured-games'>
                    <h1>Featured</h1>
                    <div className='split-line'></div>

                    <div className='featured-games-slider'>
                        <div className='button-left' onClick={() => setIndex(index === 0 ? 2 : index - 1)}><IoIosArrowBack /></div>

                        <div className="slideshow-container">
                            <div
                                className="slideshow-track"
                                style={{ transform: `translateX(-${index * (1 / 3) * 100}%)`, transition: 'transform 0.5s ease-in-out' }}
                            >
                                {featuredGames.map((game, i) => (
                                    <div key={i} className="slideshow-slide" onClick={() => { navigate(`/games/${game.title}`) }}>
                                        <div className='slideshow-text-container'>
                                            <div className="vertical-line">
                                            </div>
                                            <div className="slideshow-text">
                                                <h2>{game.creator}</h2>
                                                <h3>{game.title}</h3>
                                            </div>
                                        </div>
                                        <img src={game.src} alt={`Featured game ${i + 1}`} className="slideshow-image" />
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className='button-right' onClick={() => setIndex(index === 2 ? 0 : index + 1)}><IoIosArrowForward /></div>
                        <div className='slideshow-indicators'><div className={`indicator ${index === 0 ? 'active' : ''}`}></div><div className={`indicator ${index === 1 ? 'active' : ''}`}></div><div className={`indicator ${index === 2 ? 'active' : ''}`}></div></div>
                    </div>

                </div>
                <div className='recent-releases'>
                    <h1>Recent Student Releases</h1>
                    <div className='split-line'></div>
                    <div className='recent-releases-slider' ref={sliderRef}>
                        <div className='game-card-button-left' onClick={() => setRecentIndex(recentIndex === 0 ? 5 : recentIndex - 1)}><IoIosArrowBack /></div>                        <div className='game-cards'>
                            <div className='game-card-track'
                                style={{ transform: `translateX(-${recentIndex * (width+15)}px)`, transition: 'transform 0.5s ease-in-out', width: (width*8)+(8*15) }}

                            >
                                {recentReleases.map((game, i) => (
                                    <Gamecard key={i} image={game.image} title={game.title} creator={game.creator} width={width}/>
                                ))}
                            </div>
                        </div>
                        {/*GONNA NEED SOME MAD CALCULATIONS FOR GETTING THIS TO WORK EVENLY CAN MAYBE DO TOTAL OF LENGTH OF ALL THE GAMECARDS / SOME NUMBER TO GET HOW MUCH YOU NEED TO SCROLL EACH TIME AND HOW MANY TIMES */}
                        <div className='game-card-button-right' onClick={() => setRecentIndex(recentIndex === 5 ? 0 : recentIndex + 1)}><IoIosArrowForward /></div>
                    </div>
                </div>
                <div className='most-liked'>
                    <h1>Most Liked</h1>
                    <div className='split-line'></div>
                    <div className='recent-releases-slider' ref={sliderRef}>
                        <div className='game-card-button-left' onClick={() => setLikedIndex(likedIndex === 0 ? 5 : likedIndex - 1)}><IoIosArrowBack /></div>                        <div className='game-cards'>
                            <div className='game-card-track'
                                style={{ transform: `translateX(-${likedIndex * (width+11.5)}px)`, transition: 'transform 0.5s ease-in-out', width: (width*8)+(8*15) }}

                            >
                                {mostLiked.map((game, i) => (
                                    <Gamecard key={i} image={game.image} title={game.title} creator={game.creator} width={width} variant="ranking" rank={i+1}/>
                                ))}
                            </div>
                        </div>
                        {/*GONNA NEED SOME MAD CALCULATIONS FOR GETTING THIS TO WORK EVENLY CAN MAYBE DO TOTAL OF LENGTH OF ALL THE GAMECARDS / SOME NUMBER TO GET HOW MUCH YOU NEED TO SCROLL EACH TIME AND HOW MANY TIMES */}
                        <div className='game-card-button-right' onClick={() => setLikedIndex(likedIndex === 5 ? 0 : likedIndex + 1)}><IoIosArrowForward /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
