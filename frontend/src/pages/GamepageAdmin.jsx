import React from 'react'
import '../css/GamepageAdmin.css'
import { useParams } from 'react-router';
import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Developercard from '../components/Developercard';
import Genrebox from '../components/Genrebox';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router';
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';

function GamepageAdmin() {

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

    const [index, setIndex] = useState(0);
    const { gameName } = useParams();
    const [developerCard, setDeveloperCard] = useState([]);
    const [gameInfo, setGameInfo] = useState({});
    const navigate = useNavigate();
    const [gameImages, setGameImages] = useState([]);

    useEffect(() => {
        if (!gameName) return;

        const getGameInfo = async () => {
            try {
                const gameInfo = await axios.post(`${backend_url}/database/admingameinfo`, { gameName })

                const gameData = gameInfo.data.gameData;
                setGameInfo({
                    title: gameData.gameName,
                    description: gameData.gameDesc,
                    likes: gameData.likes,
                    releaseDate: gameData.releaseDate,
                    developer: gameData.teamName,
                    timeframe: gameData.projectTimeframe,
                    fileSize: gameData.fileSize,
                    projectType: gameData.projectType,
                    description: gameInfo.data.gameData.gameDesc,
                    genre: gameInfo.data.genreArray
                })
                try {
                    const images = await axios.post(`${backend_url}/storage/getgameimages`, { gameName: gameData.gameName })
                    const gameTrailer = await axios.post(`${backend_url}/storage/getgametrailer`, { gameName: gameData.gameName });
                    if (gameTrailer.data.trailerUrl === "nothing") {
                        setGameImages([
                            { src: images.data.gameImages[0].imageUrl, type: 'image' },
                            { src: images.data.gameImages[1].imageUrl, type: 'image' },
                            { src: images.data.gameImages[2].imageUrl, type: 'image' }
                        ]);

                    }
                    else {
                        setGameImages([
                            { src: images.data.gameImages[0].imageUrl, type: 'image' },
                            { src: images.data.gameImages[1].imageUrl, type: 'image' },
                            { src: images.data.gameImages[2].imageUrl, type: 'image' },
                            { src: gameTrailer.data.trailerUrl, type: 'video' }
                        ]);
                    }
                } catch (err) {
                    console.log(err)
                    alert("Error fetching game images")
                }
            }
            catch (error) {
                alert(error.message)
            }
        }
        getGameInfo();
        setDeveloperCard([
            {
                name: 'Alice Johnson',
                age: '25',
                email: 'alice.johnson@example.com',
                phone: '021 234 5678',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'Alice is a passionate software developer with a love for gaming and AI. She loves exploring new technologies and building impactful solutions.',
                skills: [
                    "Python", "Machine Learning", "AI", "Data Analysis"
                ],
                projects: [
                    { src: 'https://www.example.com/project1.jpg', name: 'AI Chatbot' },
                    { src: 'https://www.example.com/project2.jpg', name: 'Data Visualizer' }
                ]
            },
            {
                name: 'John Smith',
                age: '28',
                email: 'john.smith@example.com',
                phone: '022 876 5432',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'John is a full-stack web developer with a strong background in front-end development. He enjoys working on modern web applications and user experiences.',
                skills: [
                    "JavaScript", "React", "Node.js", "CSS"
                ],
                projects: [
                    { src: 'https://www.example.com/project3.jpg', name: 'E-commerce Website' },
                    { src: 'https://www.example.com/project4.jpg', name: 'Portfolio Site' }
                ]
            },
            {
                name: 'Sophia Williams',
                age: '22',
                email: 'sophia.williams@example.com',
                phone: '021 567 8901',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'Sophia is a mobile app developer with a passion for building seamless user experiences. She specializes in iOS and Android app development.',
                skills: [
                    "Swift", "Kotlin", "React Native", "UI/UX Design"
                ],
                projects: [
                    { src: 'https://www.example.com/project5.jpg', name: 'Fitness Tracker App' },
                    { src: 'https://www.example.com/project6.jpg', name: 'Recipe Finder App' }
                ]
            },
            {
                name: 'Michael Brown',
                age: '30',
                email: 'michael.brown@example.com',
                phone: '022 123 4567',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'Michael is a backend engineer with experience in designing scalable systems and working with cloud services. He loves solving complex technical challenges.',
                skills: [
                    "Java", "Spring Boot", "AWS", "Docker"
                ],
                projects: [
                    { src: 'https://www.example.com/project7.jpg', name: 'Weather Forecasting System' },
                    { src: 'https://www.example.com/project8.jpg', name: 'Inventory Management System' }
                ]
            },
            {
                name: 'Emma Davis',
                age: '24',
                email: 'emma.davis@example.com',
                phone: '022 765 4321',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'Emma is a front-end developer with a strong focus on design and user experience. She is passionate about creating intuitive interfaces for web applications.',
                skills: [
                    "HTML", "CSS", "JavaScript", "React"
                ],
                projects: [
                    { src: 'https://www.example.com/project9.jpg', name: 'Personal Blog Website' },
                    { src: 'https://www.example.com/project10.jpg', name: 'Task Management App' }
                ]
            }
        ]);


    }, [gameName])

    const videoRefs = useRef([]);


    useEffect(() => {
        gameImages.forEach((game, i) => {
            if (game.type === 'video' && videoRefs.current[i]) {
                const video = videoRefs.current[i];

                if (index === i) {
                    video.currentTime = 0;
                    video.play();

                    const loop = () => {
                        video.currentTime = 0;
                        video.play();
                    };
                    video.addEventListener('ended', loop);

                    // Clean up event listener
                    return () => {
                        video.removeEventListener('ended', loop);
                    };
                } else {
                    video.pause();
                }
            }
        });
    }, [index, gameImages]);


    return (
        <div className='gamepage-container' id='admin-gamepg'>
            <ToastContainer />
            <div className='gamepage-inner'>
                <div className='gamepage-header-container-admin'>
                    <div className='back-button-admin' onClick={() => navigate('/account', { state: { fromManageUploads: true } })}>
                        <IoMdArrowBack className='back-admin-game' />
                    </div>
                    <div className='gamepage-header'>
                        <h1>{gameInfo.title}</h1>
                        <h2>{gameInfo.developer}</h2>
                    </div>
                </div>
                <div className='gamepage-info'>
                    <div className='gamepage-slider'>
                        <div className='gamepage-slider-top'>
                            <div className='gamepage-slider-track'
                                style={{
                                    transform: `translateX(-${index * (1 / gameImages.length) * 100}%)`,
                                    transition: 'transform 0.5s ease-in-out',
                                    width: `calc(100% * ${gameImages.length})`
                                }}
                            >
                                {gameImages.map((game, i) => (
                                    <div key={i} className="gamepage-slideshow-slide" style={{ width: `calc(100% / ${gameImages.length})` }}>
                                        {game.type === 'image' ? (
                                            <img src={game.src} alt="gameimg" />
                                        ) : (
                                            <video
                                                ref={el => videoRefs.current[i] = el}
                                                src={game.src}
                                                className="slide"
                                                style={{ maxHeight: '400px' }}
                                                muted
                                            />
                                        )}
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className='gamepage-slider-bottom'>
                            <div className='gamepage-slider-button-left' onClick={() => setIndex((index - 1 + gameImages.length) % gameImages.length)}><IoIosArrowBack style={{ margin: '0' }} /></div>
                            <div className='gamepage-slider-indicators'>
                                {gameImages.map((game, i) =>
                                    <div onClick={() => setIndex(i)} className={`gamepage-slider-indicator ${index === i ? 'active' : ''}`}> </div>
                                )}

                            </div>
                            <div className='gamepage-slider-button-right' onClick={() => setIndex((index + 1) % gameImages.length)}><IoIosArrowForward style={{ margin: '0' }} /></div>
                        </div>

                    </div>
                    <div className='gamepage-sidebar'>
                        <div className='gamepage-sidebar-inner'>
                            <h2>About</h2>
                            <div id="top" className="skinny-white-bar">
                            </div>
                            <p>{gameInfo.description}</p>
                            <div className='genre-box'>
                                {gameInfo?.genre?.map((g, idx) => (
                                    <Genrebox key={idx} genre={g} onClick={() => navigate("/")} />
                                ))}
                            </div>
                            <div className='gamepage-details'>
                                <div className='gamepage-details-item'>
                                    <h2>Game</h2>
                                    <h2>{gameInfo.title}</h2>
                                </div>
                                <div className="skinny-white-bar"></div>
                                <div className='gamepage-details-item'>
                                    <h2>Project</h2>
                                    <h2>{gameInfo.projectType}</h2>
                                </div>
                                <div className="skinny-white-bar"></div>
                                <div className='gamepage-details-item'>
                                    <h2>Timeframe</h2>
                                    <h2>{gameInfo.timeframe} Weeks</h2>
                                </div>
                                <div className="skinny-white-bar"></div>
                                <div className='gamepage-details-item'>
                                    <h2>Release Date</h2>
                                    <h2>{gameInfo.releaseDate}</h2>
                                </div>
                                <div className="skinny-white-bar"></div>
                                <div className='gamepage-details-item'>
                                    <h2>Developers</h2>
                                    <h2>{gameInfo.developer}</h2>
                                </div>
                                <div className="skinny-white-bar"></div>
                                <div className='gamepage-details-item'>
                                    <h2>File Size</h2>
                                    <h2>{gameInfo.fileSize} MB</h2>
                                </div>
                                <div className="skinny-white-bar"></div>

                            </div>
                            <div className='gamepage-details-button-div'>
                                <button>Download</button>
                            </div>
                        </div>

                    </div>
                </div>
                <h1>{gameInfo.developer}</h1>
                <div className='dev-info-container'
                    style={{ overflowX: developerCard.length > 3 ? 'scroll' : 'none' }}
                >
                    <div className='developer-info'>

                        <div className='developer-cards' >
                            {developerCard.map((card, i) => (
                                <Developercard key={i} name={card.name} age={card.age} picture={card.picture} about={card.about} projects={card.projects} email={card.email} phone={card.phone} skills={card.skills} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamepageAdmin