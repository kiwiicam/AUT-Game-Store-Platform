import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SlLike } from "react-icons/sl";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Genrebox from '../components/Genrebox.jsx';
import { useNavigate } from 'react-router-dom';

import '../css/Gamepage.css'
import Developercard from '../components/Developercard.jsx';


function Gamepage() {
    const [index, setIndex] = useState(0);
    const [gameImages, setGameImages] = useState([]);
    const [gameInfo, setGameInfo] = useState({});
    const [developerCard, setDeveloperCard] = useState([])
    const navigate = useNavigate();
    const { slug } = useParams();
    useEffect(() => {
        setGameImages([
            { src: 'https://staticg.sportskeeda.com/editor/2025/01/8827f-17376979472538-1920.jpg' },
            { src: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/02/minecraft-key-art-feature.jpg' },
            { src: 'https://www.azcentral.com/gcdn/authoring/authoring-images/2024/11/19/USAT/76424170007-merlin-minecraft-image-2.jpg?crop=2149,1208,x0,y0&width=660&height=371&format=pjpg&auto=webps' }
        ]);

        setGameInfo({
            title: 'Minecraft',
            description: 'Minecraft is a sandbox video game developed by Mojang Studios. It allows players to build and explore virtual worlds made up of blocks. It is a game of creativity and survival, where players can gather resources, craft items, and build structures. The game features different modes, including survival mode, where players must manage their health and hunger, and creative mode, where they have unlimited resources to build freely.',
            likes: 462,
            releaseDate: 'November 18, 2011',
            developer: 'Mojang Studios',
            timeframe: 'Ongoing',
            releaseDate: 'November 18, 2011',
            fileSize: '1.5 GB',
            projectType: 'Team Group Project',
            genre: ['Adventure', 'Sandbox', 'Survival'],
            developmentTeam: ['Campbell', 'Blaine', 'Joshua', 'Karlos']
        });

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
    }, []);
    return (
        <div className='gamepage-container'>
            <div className='gamepage-inner'>
                <div className='gamepage-header-container'>
                    <div className='gamepage-header'>
                        <h1>{gameInfo.title}</h1>
                        <h2>{gameInfo.developer}</h2>
                    </div>
                    <div className='gamepage-likes'>
                        <p>{gameInfo.likes}</p>
                        <div className='gamepage-like-icon'><SlLike /></div>
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
                                        <img src={game.src} alt={slug} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='gamepage-slider-bottom'>
                            <div className='gamepage-slider-button-left' onClick={() => setIndex((index - 1 + gameImages.length) % gameImages.length)}><IoIosArrowBack style={{ margin: '0' }} /></div>
                            <div className='gamepage-slider-indicators'>
                                <div className={`gamepage-slider-indicator ${index === 0 ? 'active' : ''}`}> </div>
                                <div className={`gamepage-slider-indicator ${index === 1 ? 'active' : ''}`}> </div>
                                <div className={`gamepage-slider-indicator ${index === 2 ? 'active' : ''}`}> </div>
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
                                    <h2>{gameInfo.timeframe}</h2>
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
                                    <h2>{gameInfo.fileSize}</h2>
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

export default Gamepage
