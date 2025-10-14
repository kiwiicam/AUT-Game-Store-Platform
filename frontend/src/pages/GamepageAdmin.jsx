import React from 'react'
import '../css/GamepageAdmin.css'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
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
                    setGameImages([
                        { src: images.data.gameImages[0].imageUrl },
                        { src: images.data.gameImages[1].imageUrl },
                        { src: images.data.gameImages[2].imageUrl }
                    ]);
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
                name: 'Campbell',
                age: '21',
                email: 'cam@gmail.com',
                phone: '022 044 3212',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'This is just a little paragraph about ya boy and you know im a guy and this is just me typing random crap hopefully this turns out okay what should the word limit be for this?',
                skills:
                    [
                        "C++", "Teamwork", "Java", "Data structures"
                    ],
                projects:
                    [
                        { src: 'https://movingstory-prod.imgix.net/movies/headers/minecraft.jpg?w=1440&h=602&auto=compress,format&fit=crop', name: 'minecraft' },
                        { src: 'https://www.minecraft.net/content/dam/minecraftnet/games/dungeons/key-art/Downloads_Box-Art_Dungeons_600x337.jpg', name: 'Minecraft Dungeons' }
                    ]
            },
            {
                name: 'Campbell',
                age: '21',
                email: 'cam@gmail.com',
                phone: '022 044 3212',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'This is just a little paragraph about ya boy and you know im a guy and this is just me typing random crap hopefully this turns out okay what should the word limit be for this?',
                skills:
                    [
                        "C++", "Teamwork", "Java", "Data structures"
                    ],
                projects:
                    [
                        { src: 'https://movingstory-prod.imgix.net/movies/headers/minecraft.jpg?w=1440&h=602&auto=compress,format&fit=crop', name: 'minecraft' },
                        { src: 'https://www.minecraft.net/content/dam/minecraftnet/games/dungeons/key-art/Downloads_Box-Art_Dungeons_600x337.jpg', name: 'Minecraft Dungeons' }
                    ]
            }, {
                name: 'Campbell',
                age: '21',
                email: 'cam@gmail.com',
                phone: '022 044 3212',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'This is just a little paragraph about ya boy and you know im a guy and this is just me typing random crap hopefully this turns out okay what should the word limit be for this?',
                skills:
                    [
                        "C++", "Teamwork", "Java", "Data structures"
                    ],
                projects:
                    [
                        { src: 'https://movingstory-prod.imgix.net/movies/headers/minecraft.jpg?w=1440&h=602&auto=compress,format&fit=crop', name: 'minecraft' },
                        { src: 'https://www.minecraft.net/content/dam/minecraftnet/games/dungeons/key-art/Downloads_Box-Art_Dungeons_600x337.jpg', name: 'Minecraft Dungeons' }
                    ]
            },
            {
                name: 'Campbell',
                age: '21',
                email: 'cam@gmail.com',
                phone: '022 044 3212',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'This is just a little paragraph about ya boy and you know im a guy and this is just me typing random crap hopefully this turns out okay what should the word limit be for this?',
                skills:
                    [
                        "C++", "Teamwork", "Java", "Data structures"
                    ],
                projects:
                    [
                        { src: 'https://movingstory-prod.imgix.net/movies/headers/minecraft.jpg?w=1440&h=602&auto=compress,format&fit=crop', name: 'minecraft' },
                        { src: 'https://www.minecraft.net/content/dam/minecraftnet/games/dungeons/key-art/Downloads_Box-Art_Dungeons_600x337.jpg', name: 'Minecraft Dungeons' }
                    ]
            },
            {
                name: 'Campbell',
                age: '21',
                email: 'cam@gmail.com',
                phone: '022 044 3212',
                picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                about: 'This is just a little paragraph about ya boy and you know im a guy and this is just me typing random crap hopefully this turns out okay what should the word limit be for this?',
                skills:
                    [
                        "C++", "Teamwork", "Java", "Data structures"
                    ],
                projects:
                    [
                        { src: 'https://movingstory-prod.imgix.net/movies/headers/minecraft.jpg?w=1440&h=602&auto=compress,format&fit=crop', name: 'minecraft' },
                        { src: 'https://www.minecraft.net/content/dam/minecraftnet/games/dungeons/key-art/Downloads_Box-Art_Dungeons_600x337.jpg', name: 'Minecraft Dungeons' }
                    ]
            }
        ])
    }, [gameName])

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
                                style={{ transform: `translateX(-${index * (1 / 3) * 100}%)`, transition: 'transform 0.5s ease-in-out' }}
                            >
                                {gameImages.map((game, i) => (
                                    <div key={i} className="gamepage-slideshow-slide">
                                        <img src={game.src} alt="gameimg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='gamepage-slider-bottom'>
                            <div className='gamepage-slider-button-left' onClick={() => setIndex((index - 1 + gameImages.length) % gameImages.length)}><IoIosArrowBack style={{ margin: '0' }} /></div>
                            <div className='gamepage-slider-indicators'>
                                <div onClick={() => setIndex(0)} className={`gamepage-slider-indicator ${index === 0 ? 'active' : ''}`}> </div>
                                <div onClick={() => setIndex(1)} className={`gamepage-slider-indicator ${index === 1 ? 'active' : ''}`}> </div>
                                <div onClick={() => setIndex(2)} className={`gamepage-slider-indicator ${index === 2 ? 'active' : ''}`}> </div>
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
                <div className='dev-info-container'>
                    <div className='developer-info'>

                        <div className='developer-cards'>
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