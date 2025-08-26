import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SlLike } from "react-icons/sl";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Genrebox from '../components/Genrebox.jsx';
import { useNavigate } from 'react-router-dom';
import { FaArrowDown } from "react-icons/fa";
import Commentcard from "../components/Commentcard.jsx"
import '../css/Gamepage.css'
import Developercard from '../components/Developercard.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Gamepage() {
    const [index, setIndex] = useState(0);
    const [gameImages, setGameImages] = useState([]);
    const [gameInfo, setGameInfo] = useState({});
    const [developerCard, setDeveloperCard] = useState([]);
    const [loggedIn, setLoggedIn] = useState(true);
    const [commentCards, setCommentCards] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);

    const [comment, setComment] = useState("");

    //filter states
    const [withinMonth, setWithinMonth] = useState(false);
    const [mostRecent, setMostRecent] = useState(true);
    const [leastRecent, setLeastRecent] = useState(false);

    const navigate = useNavigate();
    const { gameName } = useParams();

    useEffect(() => {
        if (!gameName) return;
        async function retrieveGameData() {
            try {
                const databaseData = await axios.post('http://localhost:8000/api/database/getgameinfo', { gameName });

                setGameInfo({
                    title: databaseData.data.gameData.gameName,
                    description: databaseData.data.gameData.gameDesc,
                    likes: 462,
                    developer: databaseData.data.gameData.teamName,
                    timeframe: databaseData.data.gameData.projectTimeframe + " Weeks",
                    releaseDate: databaseData.data.gameData.releaseDate,
                    fileSize: databaseData.data.gameData.fileSize + " MB",
                    projectType: databaseData.data.gameData.projectType,
                    genre: databaseData.data.genreArray,
                    developmentTeam: databaseData.data.gameData.groupMembers
                });
                const images = await axios.post('http://localhost:8000/api/storage/getgameimages', { gameName: databaseData.data.gameData.gameName })
                setGameImages([
                    { src: images.data.gameImages[0].imageUrl },
                    { src: images.data.gameImages[1].imageUrl },
                    { src: images.data.gameImages[2].imageUrl }
                ]);

                //const developerInfo = await axios.post('http://localhost:8000/api/database/getdeveloperinfo', { groupArray: databaseData.data.gameData.groupMembers })

                const commentInfo = await axios.post('http://localhost:8000/api/database/retrievecomments', { gameName: databaseData.data.gameData.gameName })
                const commentState = commentInfo.data.commentData.map(value => ({
                    text: value.comment,
                    name: value.userName,
                    picsrc: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    date: new Date(value.timestamp).toLocaleString('en-NZ')
                }))
                setCommentCards(commentState)
            }
            catch (error) {
                toast.error('Error retreiving the data for this game, please try again later.', {
                    position: 'top-center', autoClose: 3000,
                });
            }
        }

        retrieveGameData();

    }, [gameName])

    useEffect(() => {




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

    useEffect(() => {
        if (!mostRecent && !leastRecent) {
            setMostRecent(true);
        }
    }, [mostRecent, leastRecent]);

    const handleMostRecentChange = (checked) => {
        setMostRecent(checked);
        if (checked) setLeastRecent(false);
    };
    const handleLeastRecentChange = (checked) => {
        setLeastRecent(checked);
        if (checked) setMostRecent(false);
    };

    async function uploadComment() {
        if (comment.length > 80) {
            toast.error('Sorry, your comment cannot be longer than 80 characters.', {
                position: 'top-center', autoClose: 3000,
            });
            return
        }
        try {
            const timestamp = Date.now()
            const response = await axios.post('http://localhost:8000/api/database/uploadcomment', {
                gameName,
                comment,
                userName: "Campbell",
                timestamp
            })
            const newComment = {
                text: comment,
                name: "Campbell",
                date: timestamp,
                picsrc: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            }
            setComment("");
            setCommentCards((prev) => [...prev, newComment])
            toast.success('Your comment has been uploaded successfuly', {
                position: 'top-center', autoClose: 3000,
            });
        }
        catch (error) {
            toast.error(error.message, {
                position: 'top-center', autoClose: 3000,
            });
        }
    }
    return (
        <div className='gamepage-container'>
            <ToastContainer />
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
                <div className='comment-section'>
                    <h1>Comments</h1>
                    <div className='inner-comment'>
                        <div className='comment-section-main'
                            style={{
                                overflowY: commentCards.length > 2 ? "scroll" : "auto"
                            }}
                        >
                            {loggedIn ?
                                <div className='logged-in-comment'>
                                    <div className='comment-pfp'>
                                        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'>

                                        </img>
                                    </div>
                                    <div className='comment-input'>
                                        <input value={comment} onChange={(e) => setComment(e.target.value)} className='comment-input-field' type='text' placeholder='Add a comment...' />
                                        <div onClick={() => uploadComment()} className='comment-submit'>
                                            <FaArrowDown />
                                        </div>
                                    </div>
                                </div>
                                : <div><h2>Please login to comment</h2></div>}

                            <div className='comments-container'>

                                {commentCards.slice(0, visibleCount).map((comment, index) => (
                                    <Commentcard key={index} text={comment.text} name={comment.name} picsrc={comment.picsrc} date={comment.date} />
                                ))}
                                {commentCards.length > 0 ?
                                    commentCards.length > 5 ?
                                        visibleCount < commentCards.length ?
                                            <button onClick={() => { setVisibleCount(prevCount => prevCount + 5) }}>Show more Comments</button>
                                            :
                                            <button onClick={() => { setVisibleCount(5) }}>Show less comments</button>
                                        : <></>
                                    : <></>
                                }
                            </div>
                        </div>
                        <div className='comment-section-filters'>
                            <h3>Filter by</h3>
                            <div className='skinny-white-line'></div>
                            <h4>Date added</h4>
                            <div className='within-month'>
                                <input type='checkbox' onChange={(e) => { setWithinMonth(e.target.checked) }} />
                                <h2>Within 30 days</h2>
                            </div>
                            <div className='skinny-white-line'></div>
                            <h4>Order by</h4>
                            <div className='within-month'>
                                <input type='checkbox'
                                    checked={mostRecent}
                                    onChange={(e) => handleMostRecentChange(e.target.checked)}
                                />
                                <h2>Most Recent</h2>
                            </div>
                            <div className='within-month'>
                                <input type='checkbox'
                                    checked={leastRecent}
                                    onChange={(e) => handleLeastRecentChange(e.target.checked)} />
                                <h2>Least Recent</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gamepage
