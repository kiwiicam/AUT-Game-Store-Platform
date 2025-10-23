import React, { useEffect, useState, useRef } from 'react'
import '../css/Homepage.css'
import Gamecard from '../components/Gamecard'
import GamecardNew from '../components/GamecardNew';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router';
import axios from 'axios'
function Homepage() {

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

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

    const [sliderHover, setSliderHover] = useState(false);

    const sliderRef = useRef(null);
    useEffect(() => {

        const scrollLargeSlider = () => {
            if (sliderHover) return;
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
                scrollLargeSlider();
            }, 4000);

        }
        scrollLargeSlider();
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
                setMostLiked(
                    featuredGamesReturn.slice(0, 8).map(game => ({
                        image: game.src,
                        title: game.title,
                        desc: game.desc,
                        creator: game.creator
                    }))
                );
            }
            catch (error) {
                alert(error.message)
                console.error("Error fetching featured games:", error);
            }
        }



        const fetchRecentReleases = async () => {
            try {
                const response = await axios.get(`${backend_url}/database/recentreleases`);
                setRecentReleases(response.data.recentGames);


            }
            catch (error) {
                alert(error.message)
                console.error("Error fetching recent releases:", error);
            }

        }

        const fetchClassicGames = async () => {
            try {
                const response = await axios.get(`${backend_url}/database/classicGames`);

                const mappedMultiplayerGames = response.data.oldestGames.map((game, i) => ({
                    image: game.src,           // image URL
                    title: game.title,         // game name
                    creator: game.creator,     // team name
                    genres: game.genre || [],
                    likes: game.likes || 0,
                    releaseDate: game.releaseDate || 'TBA',
                    fileSize: game.fileSize || 0
                }));
                console.log(response.data.oldestGames[0].genre)
                setMultiplayerGames(mappedMultiplayerGames);

            }
            catch (error) {
                alert(error.message)
                console.error("Error fetching classic games:", error);
            }

        }

        const fetchClassics = async () => {
            try {
                const response = await axios.get(`${backend_url}/database/randomGames`)
                setTrendingGames(response.data.randomGames);
            }
            catch (error) {
                alert(error.message)
                console.error("Error fetching classic games:", error);
            }
        }


        fetchClassics();
        fetchFeaturedGames();
        fetchRecentReleases();
        //fetchMultiplayerGames();

        fetchClassicGames();
    }, [])


    function setId(slideshowID) {
        setMultiplayerIndex(
            slideshowID < 1 ? 0 :
                slideshowID > 7 ? slideshowID - 2 :
                    slideshowID - 1
        );
    }

    function setRecentId(slideshowID) {
        setRecentIndex(
            slideshowID < 1 ? 0 :
                slideshowID > 7 ? slideshowID - 2 :
                    slideshowID - 1
        );
    }

    return (
        <div className='homepage-background'>
            <div className='homepage-content'>
                <div className='homepage-banner'>
                    <div className='banner-text'>
                        {/* Replace the H1 with SVG */}
                        <svg
                        className='banner-aut-svg'
                        viewBox='0 0 140 130'
                        xmlns='http://www.w3.org/2000/svg'
                        >
                        <defs>
                            <linearGradient id='autGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                            <stop offset='0%' stopColor='#00b4ff' />
                            <stop offset='100%' stopColor='#0061ff' />
                            </linearGradient>
                        </defs>

                        <text
                            x='50%'
                            y='60%'
                            textAnchor='middle'
                            dominantBaseline='middle'
                            fontFamily="'Bebas Neue', sans-serif"
                            fontSize='110'
                            fill='transparent'
                            stroke='white'
                            strokeWidth='2'
                            paintOrder='stroke'
                        >
                            AUT
                        </text>
                        </svg>

                        <div className='banner-comp'>
                            <h2>COMP710</h2>
                            <h3>GAME PROGRAMMING</h3>
                        </div>
                    </div>
                </div>
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
                                    <div key={i} className="slideshow-slide" onClick={() => { navigate(`/games/${game.title}`) }} onMouseEnter={() => setSliderHover(true)} onMouseLeave={() => setSliderHover(false)} >
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
                            <div className='game-card-track-new'
                                style={{
                                    transform: `translateX(-${recentIndex === 7
                                        ? (recentReleases.length * (width + 15)) - sliderRef.current.offsetWidth
                                        : recentIndex * (width + 15)
                                        }px)`,
                                    transition: 'transform 0.5s ease-in-out',
                                    width: recentReleases.length * (width * 1.09) + (recentReleases.length - 1) * 15
                                }}
                            >
                                {recentReleases.map((game, i) => (
                                    <GamecardNew key={i} slideid={i} gameImage={game.src} gameName={game.title} TeamName={game.creator} width={width} size={game.fileSize || 67} release={game.releaseDate || 'TBA'} likes={game.likes || 0} genres={game.genres || []} setid={setRecentId} />
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
                    <h1>Random Games</h1>
                    <div className='split-line'></div>
                    <div className='recent-releases-slider' ref={sliderRef}>
                        <div className='game-card-button-left' onClick={() => setTrendingIndex(trendingIndex === 0 ? 5 : trendingIndex - 1)}><IoIosArrowBack /></div>                        <div className='game-cards'>
                            <div className='game-card-track'
                                style={{ transform: `translateX(-${trendingIndex * (width + 15)}px)`, transition: 'transform 0.5s ease-in-out', width: (width * 8) + (8 * 15) }}

                            >
                                {trendingGames.map((game, i) => (
                                    <Gamecard key={i} image={game.src} title={game.title} creator={game.creator} width={width} />
                                ))}
                            </div>
                        </div>
                        {/*GONNA NEED SOME MAD CALCULATIONS FOR GETTING THIS TO WORK EVENLY CAN MAYBE DO TOTAL OF LENGTH OF ALL THE GAMECARDS / SOME NUMBER TO GET HOW MUCH YOU NEED TO SCROLL EACH TIME AND HOW MANY TIMES */}
                        <div className='game-card-button-right' onClick={() => setTrendingIndex(trendingIndex === 5 ? 0 : trendingIndex + 1)}><IoIosArrowForward /></div>
                    </div>
                </div>
                <div className='multiplayer-games'>
                    <h1>Classic Games</h1>
                    <div className='split-line'></div>
                    <div className='recent-releases-slider' ref={sliderRef}>
                        <div className='game-card-button-left' onClick={() => setMultiplayerIndex(multiplayerIndex === 0 ? 5 : multiplayerIndex - 1)}><IoIosArrowBack /></div>
                        <div className='game-cards'>
                            <div className='game-card-track-new'
                                style={{
                                    transform: `translateX(-${multiplayerIndex === 7
                                        ? (multiplayerGames.length * (width + 15)) - sliderRef.current.offsetWidth
                                        : multiplayerIndex * (width + 15)
                                        }px)`,
                                    transition: 'transform 0.5s ease-in-out',
                                    width: multiplayerGames.length * (width * 1.09) + (multiplayerGames.length - 1) * 15
                                }}
                            >
                                {multiplayerGames.map((game, i) => (
                                    <GamecardNew key={i} slideid={i} gameImage={game.image} gameName={game.title} TeamName={game.creator} width={width} size={game.fileSize || 0} release={game.releaseDate || 'TBA'} likes={game.likes || 0} genres={game.genres} setid={setId} />
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
