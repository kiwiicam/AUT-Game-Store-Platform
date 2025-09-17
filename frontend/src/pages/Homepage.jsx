import React, { useEffect, useState, useRef } from 'react'
import '../css/Homepage.css'
import Gamecard from '../components/Gamecard'
import GamecardNew from '../components/GamecardNew';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router';
import axios from 'axios'
function Homepage() {

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

    const [hoverLocked, setHoverLocked] = useState(false);

    const [featuredGames, setFeaturedGames] = useState([]);
    const [recentReleases, setRecentReleases] = useState([]);
    const [mostLiked, setMostLiked] = useState([]);
    const [trendingGames, setTrendingGames] = useState([]);
    const [multiplayerGames, setMultiplayerGames] = useState([]);

    const [index, setIndex] = useState(0);
    const [recentIndex, setRecentIndex] = useState(0);
    const [likedIndex, setLikedIndex] = useState(0);
    const [trendingIndex, setTrendingIndex] = useState(0);
    const [multiplayerIndex, setMultiplayerIndex] = useState(0);

    const navigate = useNavigate();

    const [width, setWidth] = useState(null);

    const sliderRef = useRef(null);
    useEffect(() => {
        // This is where you can fetch data for the homepage, like featured games
        setWidth((sliderRef.current.offsetWidth - 45) / 3)
        const fetchFeaturedGames = async () => {
            try {
                const response = await axios.get(`${backend_url}/database/featuredgames`)

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

        setTrendingGames([
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games" },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios" },
            { image: "http://localhost:3000/joshgame.png", title: "Josh's game", creator: "Joshua Knight" },
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games" },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios" },
            { image: "http://localhost:3000/joshgame.png", title: "Josh's game", creator: "Joshua Knight" }
        ]);

        setMultiplayerGames([
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang", genres: ["Sandbox", "Survival", "Multiplayer"] },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games", genres: ["Sandbox", "Survival", "Multiplayer"] },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios", genres: ["Sandbox", "Survival", "Multiplayer"] },
            { image: "http://localhost:3000/joshgame.png", title: "Josh's game", creator: "Joshua Knight", genres: ["Sandbox", "Survival", "Multiplayer"] },
            { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang", genres: ["Sandbox", "Survival", "Multiplayer"] },
            { image: "https://media.rockstargames.com/rockstargames/img/global/news/upload/1_gtavpc_03272015.jpg", title: "GTA 5", creator: "Rockstar Games", genres: ["Sandbox", "Survival", "Multiplayer"] },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios", genres: ["Sandbox", "Survival", "Multiplayer"] },
            { image: "https://i.guim.co.uk/img/media/c15da9438dd16a3563e80b799f65554295b81769/40_0_1200_720/master/1200.jpg?width=700&quality=85&auto=format&fit=max&s=64f83bdbf0f8d4ce2f2bd2862f30a8cd", title: "Skyrim: The Elden Scrolls V", creator: "Bethesda Game Studios", genres: ["Sandbox", "Survival", "Multiplayer"] },
        ]);
    }, [])


    function setId(slideshowID) {
        if (hoverLocked) return; // ignore if still in cooldown

        setMultiplayerIndex(
            slideshowID < 1 ? 0 :
                slideshowID > 6 ? slideshowID - 2 :
                    slideshowID - 1
        );

        setHoverLocked(true); // lock hover
        setTimeout(() => setHoverLocked(false), 500); // unlock after 1.5s
    }



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
                                style={{ transform: `translateX(-${recentIndex * (width + 15)}px)`, transition: 'transform 0.5s ease-in-out', width: (width * 8) + (8 * 15) }}

                            >
                                {recentReleases.map((game, i) => (
                                    <Gamecard key={i} image={game.image} title={game.title} creator={game.creator} width={width} />
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
                                style={{ transform: `translateX(-${likedIndex * (width + 11.5)}px)`, transition: 'transform 0.5s ease-in-out', width: (width * 8) + (8 * 15) }}

                            >
                                {mostLiked.map((game, i) => (
                                    <Gamecard key={i} image={game.image} title={game.title} creator={game.creator} width={width} variant="ranking" rank={i + 1} />
                                ))}
                            </div>
                        </div>
                        {/*GONNA NEED SOME MAD CALCULATIONS FOR GETTING THIS TO WORK EVENLY CAN MAYBE DO TOTAL OF LENGTH OF ALL THE GAMECARDS / SOME NUMBER TO GET HOW MUCH YOU NEED TO SCROLL EACH TIME AND HOW MANY TIMES */}
                        <div className='game-card-button-right' onClick={() => setLikedIndex(likedIndex === 5 ? 0 : likedIndex + 1)}><IoIosArrowForward /></div>
                    </div>
                </div>
                <div className='trending-games'>
                    <h1>Trending Student Games</h1>
                    <div className='split-line'></div>
                    <div className='recent-releases-slider' ref={sliderRef}>
                        <div className='game-card-button-left' onClick={() => setTrendingIndex(trendingIndex === 0 ? 5 : trendingIndex - 1)}><IoIosArrowBack /></div>                        <div className='game-cards'>
                            <div className='game-card-track'
                                style={{ transform: `translateX(-${trendingIndex * (width + 15)}px)`, transition: 'transform 0.5s ease-in-out', width: (width * 8) + (8 * 15) }}

                            >
                                {trendingGames.map((game, i) => (
                                    <Gamecard key={i} image={game.image} title={game.title} creator={game.creator} width={width} />
                                ))}
                            </div>
                        </div>
                        {/*GONNA NEED SOME MAD CALCULATIONS FOR GETTING THIS TO WORK EVENLY CAN MAYBE DO TOTAL OF LENGTH OF ALL THE GAMECARDS / SOME NUMBER TO GET HOW MUCH YOU NEED TO SCROLL EACH TIME AND HOW MANY TIMES */}
                        <div className='game-card-button-right' onClick={() => setTrendingIndex(trendingIndex === 5 ? 0 : trendingIndex + 1)}><IoIosArrowForward /></div>
                    </div>
                </div>
                <div className='multiplayer-games'>
                    <h1>Multiplayer Games</h1>
                    <div className='split-line'></div>
                    <div className='recent-releases-slider' ref={sliderRef}>
                        <div className='game-card-button-left' onClick={() => setMultiplayerIndex(multiplayerIndex === 0 ? 5 : multiplayerIndex - 1)}><IoIosArrowBack /></div>
                        <div className='game-cards'>
                            <div className='game-card-track-new'
                                style={{ transform: `translateX(-${multiplayerIndex * (width + 15)}px)`, transition: 'transform 0.5s ease-in-out', width: (width * 8) + (8 * 15) }}

                            >
                                {multiplayerGames.map((game, i) => (
                                    <GamecardNew key={i} slideid={i} gameImage={game.image} gameName={game.title} TeamName={game.creator} width={width} size='1.5' release='20/12/2025' likes='442' genres={game.genres} setid={setId} />
                                ))}
                            </div>
                        </div>
                        {/*GONNA NEED SOME MAD CALCULATIONS FOR GETTING THIS TO WORK EVENLY CAN MAYBE DO TOTAL OF LENGTH OF ALL THE GAMECARDS / SOME NUMBER TO GET HOW MUCH YOU NEED TO SCROLL EACH TIME AND HOW MANY TIMES */}
                        <div className='game-card-button-right' onClick={() => setMultiplayerIndex(multiplayerIndex === 5 ? 0 : multiplayerIndex + 1)}><IoIosArrowForward /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
