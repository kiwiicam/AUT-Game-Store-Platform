import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { BiSolidLike, BiLike } from "react-icons/bi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Genrebox from '../components/Genrebox.jsx';
import { useNavigate } from 'react-router-dom';
import { FaArrowDown } from "react-icons/fa";
import Commentcard from "../components/Commentcard.jsx"
import '../css/Gamepage.css'
import Developercard from '../components/Developercard.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";

function Gamepage() {

    const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';
    var searchState = "leastRecent"; //default
    var searchDState = "no"; //default

    var searchNState = 0;
    const [index, setIndex] = useState(0);
    const [gameImages, setGameImages] = useState([]);
    const [gameInfo, setGameInfo] = useState({});
    const [developerCard, setDeveloperCard] = useState([]);

    const [commentCards, setCommentCards] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const [commentLen, setCommentLen] = useState(5);
    const [comment, setComment] = useState("");
    const [startAt, setStartAt] = useState(0);
    const [endAt, setEndAt] = useState(5);
    const [loggedIn, setLoggedIn] = useState(false);
    const [commentUploaded, setCommentUploaded] = useState(true);
    const [role, setRole] = useState("");

    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    //filter states
    const [withinMonth, setWithinMonth] = useState(false);
    const [mostRecent, setMostRecent] = useState(true);
    const [leastRecent, setLeastRecent] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { gameName } = useParams();
    //pfp
    const [pfp, setImage2] = useState();
    function getSize() {
        var temp = 0;
        if (withinMonth === true) {
            temp = commentCards.length;
        }
        if (commentLen > visibleCount) {
            //   window.alert(visibleCount + " vok");

            return visibleCount + temp;
        }
        //  window.alert(commentLen + " cok");
        return commentLen + temp;
    }

    const getImage2 = async () => {
        try {
            const image = await axios.post(`${backend_url}/storage/getpfp`,
                {
                    type: 'uid',
                    id: localStorage.getItem('uid')
                })
            setImage2(image.data.imageUrl);
        }
        catch (err) {
            console.log(err.message);
        }
    }
    getImage2();


    useEffect(() => {
        if (!gameName) return;
        async function retrieveGameData() {
            try {
                const databaseData = await axios.post(`${backend_url}/database/getgameinfo`, { gameName });
                setLikes(databaseData.data.gameData.likes || 0);
                setGameInfo({
                    title: databaseData.data.gameData.gameName,
                    description: databaseData.data.gameData.gameDesc,
                    developer: databaseData.data.gameData.teamName,
                    timeframe: databaseData.data.gameData.projectTimeframe + " Weeks",
                    releaseDate: databaseData.data.gameData.releaseDate,
                    fileSize: databaseData.data.gameData.fileSize + " MB",
                    projectType: databaseData.data.gameData.projectType,
                    genre: databaseData.data.genreArray,
                    developmentTeam: databaseData.data.gameData.groupMembers
                });
                const images = await axios.post(`${backend_url}/storage/getgameimages`, { gameName: databaseData.data.gameData.gameName })

                const gameTrailer = await axios.post(`${backend_url}/storage/getgametrailer`, { gameName: databaseData.data.gameData.gameName });
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

                //const developerInfo = await axios.post('http://localhost:8000/api/database/getdeveloperinfo', { groupArray: databaseData.data.gameData.groupMembers })

                const commentInfo = await axios.post(`${backend_url}/database/retrievecomments`, { gameName: databaseData.data.gameData.gameName, searchBy: searchState, dateFilter: searchDState });

                const commentState = commentInfo.data.commentData.map(value => ({
                    text: value.comment,
                    name: value.userName,
                    uid: value.uid,
                    picsrc: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    date: value.timestamp
                }))
                for (const comment of commentState) {
                    try {
                        const image = await axios.post(`${backend_url}/storage/getpfp`,
                            {
                                type: 'uid',
                                id: comment.uid
                            });
                        comment.picsrc = image.data.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

                    }

                    catch (err) {
                        alert(err.message);

                    }

                }

                setCommentCards(commentState)
                setCommentLen(commentCards.length);
                // actualcommentLen = commentLen;
            }
            catch (error) {
                toast.error('Error retreiving the data for this game, please try again later.', {
                    position: 'top-center', autoClose: 3000,
                });
            }
        }

        retrieveGameData();

        async function retrieveAccess() {
            const uid = localStorage.getItem('uid');
            if (!uid) return;
            try {
                const response = await axios.post(`${backend_url}/database/checkaccess`, { uid, gameName });
                if (response.data.role === "student" || response.data.role === "admin" || response.data.role === "user") {
                    setLoggedIn(true);
                    setRole(response.data.role);
                    setCommentUploaded(response.data.commentUploaded);
                }
            } catch (error) {
                toast.error('Error checking access, please try again later. ' + error.message, {
                    position: 'top-center', autoClose: 3000,
                });
            }
        }
        retrieveAccess();

        async function hasUserLiked() {
            const uid = localStorage.getItem('uid');
            if (!uid) return;
            try {
                const response = await axios.post(`${backend_url}/database/hasliked`, { uid, gameName });
                setHasLiked(response.data.hasLiked);
            } catch (error) {
                console.log(error.message)
            }
        }
        hasUserLiked();


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
            //    setMostRecent(true);
            //  setLeastRecent(false);
            handleLeastRecentChange(false);
        }
    }, [mostRecent, leastRecent]);
    // setWithinMonth
    const handleDate = (isChecked) => {

        if (withinMonth == true) {
            setCommentLen(commentCards.length);
            setWithinMonth(false);
            setStartAt(0);
            setEndAt(commentCards.length);
        }
        else if (withinMonth == false) {

            const currentDate = new Date();
            let count = 0;
            for (var i = 0; i < commentCards.length; i++) {
                if (currentDate.getTime() - commentCards[i].date <= 2592000000) //30 days in milliseconds 
                {
                    count++
                    // setCommentLen(commentLen + 1);
                }
            }
            setCommentLen(count);
            setWithinMonth(true);
            if (mostRecent == true) {
                setStartAt(0);
                setEndAt(count);
            }
            if (leastRecent == true) {
                setStartAt(commentCards.length - count);
                setEndAt(commentCards.length);
            }
        }


    };
    const handleMostRecentChange = (checked) => {
        if (checked == true) {
            const sortArray = [...commentCards].sort((a, b) => b.date - a.date);
            setCommentCards(sortArray);
            if (withinMonth == true) {
                setStartAt(0);
                setEndAt(commentLen);
            }
            if (withinMonth == false) {
                setStartAt(0);
                setEndAt(commentCards.length)
            }
            setMostRecent(checked);
            if (checked) setLeastRecent(false);

        } else {
            handleLeastRecentChange(true);
        }
    };
    const handleLeastRecentChange = (checked) => {
        if (checked == true) {
            const sortArray = [...commentCards].sort((a, b) => a.date - b.date);
            setCommentCards(sortArray);
            if (withinMonth == true) {
                setStartAt(commentCards.length - commentLen);
                setEndAt(commentCards.length);
            }
            else {
                setStartAt(0);
                setEndAt(commentCards.length)
            }
            setLeastRecent(checked);
            if (checked) setMostRecent(false);
        }
        else {
            handleMostRecentChange(true);
        }
        //   window.alert(sortArray);
        //window.alert(JSON.stringify(sortArray, null, 2));

    };

    async function uploadComment() {
        if (comment.length > 80) {
            toast.error('Sorry, your comment cannot be longer than 80 characters.', {
                position: 'top-center', autoClose: 3000,
            });
            return
        }
        try {
            const uid = localStorage.getItem('uid');
            if (!uid) return;
            const timestamp = Date.now()
            const response = await axios.post('http://localhost:8000/api/database/uploadcomment', {
                gameName,
                comment,
                uid,
                timestamp
            })
            const newComment = {
                text: comment,
                name: response.data.userName,
                uid: uid,
                date: timestamp,
                picsrc: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            }
            setComment("");
            setCommentUploaded(true);
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

    const likeGame = async () => {
        if (!loggedIn) { navigate('/signin'); return }
        if (hasLiked) {
            const uid = localStorage.getItem('uid');
            if (!uid) return;
            const response = await axios.post(`${backend_url}/database/removelike`, { uid, gameName });
            setHasLiked(false);
            setLikes((prevLikes) => prevLikes - 1);
            return;
        }

        try {
            const uid = localStorage.getItem('uid');
            if (!uid) return;
            const response = await axios.post(`${backend_url}/database/likegame`, { uid, gameName });
            setHasLiked(true);
            setLikes((prevLikes) => prevLikes + 1);

        }
        catch (error) {
            toast.error('Error liking the game, please try again later. ' + error.message, {
                position: 'top-center', autoClose: 3000,
            });
        }

    }

    async function downloadGame() {
        try {
            setLoading(true);
            const response = await axios.get(
                `${backend_url}/storage/downloadGame/${gameName}`,
                { responseType: 'blob' }
            );

            // Create a link element to trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${gameName}.zip`);
            document.body.appendChild(link);
            setLoading(false);
            link.click();
            link.remove();

        } catch (err) {
            console.error("Download error:", err);
            alert("Failed to download file");
        }


    }

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
        <div className='gamepage-container'>
            {loading && (
                <div className="loader-container">
                    <ClipLoader color="#3643d7ff" size={70} />
                </div>
            )}
            <ToastContainer />
            <div className='gamepage-inner'>
                <div className='gamepage-header-container'>
                    <div className='gamepage-header'>
                        <h1>{gameInfo.title}</h1>
                        <h2>{gameInfo.developer}</h2>
                    </div>
                    <div className='gamepage-likes'>
                        <p>{likes}</p>
                        <div className='gamepage-like-icon' onClick={() => likeGame()}>{hasLiked ? <BiSolidLike style={{ fontSize: '22px' }} /> : <BiLike style={{ fontSize: '22px' }} />}</div>
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
                                <button type="submit" onClick={() => downloadGame()}>Download</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='dev-info-container'>
                    <h1>{gameInfo.developer}</h1>
                    <div className='developer-info'>

                        <div className='developer-cards'>
                            {developerCard.map((card, i) => (
                                <Developercard key={i} name={card.name} age={card.age} picture={card.picture} about={card.about} projects={card.projects} email={card.email} phone={card.phone} skills={card.skills} forGame={true} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='comment-section'>
                    <h1>Comments</h1>
                    <div className='inner-comment'>
                        <div className='comment-section-main'
                            style={{
                                overflowY: commentLen > 2 ? "scroll" : "auto"
                            }}
                        >
                            {loggedIn ? (!commentUploaded ?
                                <div className='logged-in-comment'>
                                    <div className='comment-pfp'>
                                        <img src={pfp}>
                                        </img>
                                    </div>
                                    <div className='comment-input'>
                                        <input value={comment} onChange={(e) => setComment(e.target.value)} className='comment-input-field' type='text' placeholder='Add a comment...' />
                                        <div onClick={() => uploadComment()} className='comment-submit'>
                                            <FaArrowDown />
                                        </div>
                                    </div>
                                </div> : <h2>You already have uploaded a comment.</h2>)
                                : <div><h2 style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate('/signin')}>Please login to comment.</h2></div>}

                            <div className='comments-container'>
                                {commentCards.slice(startAt, endAt).map((comment, index) => (
                                    <Commentcard key={index} text={comment.text} name={comment.name} uid={comment.uid} picsrc={comment.picsrc} date={comment.date} />
                                ))}
                                {commentLen > 0 ?
                                    commentLen > 5 ?
                                        visibleCount < commentLen ?
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

                                <input type='checkbox' checked={withinMonth} /*onChange={(e) =>searchOpt(0,e.target.checked) }*/ onChange={(e) => { handleDate(e.target.checked) }} />
                                <h2>Within 30 days</h2>
                            </div>
                            <div className='skinny-white-line'></div>
                            <h4>Order by</h4>
                            <div className='within-month'>
                                <input type='checkbox'
                                    checked={mostRecent}
                                    /*   onChange={(e) =>searchOpt(1,e.target.checked) }*/
                                    onChange={(e) => handleMostRecentChange(e.target.checked)}

                                />
                                <h2>Most Recent</h2>
                            </div>
                            <div className='within-month'> <input type='checkbox' checked={leastRecent}/* onChange={(e) =>searchOpt(2,e.target.checked) }*/
                                onChange={(e) => handleLeastRecentChange(e.target.checked)}

                            />
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
