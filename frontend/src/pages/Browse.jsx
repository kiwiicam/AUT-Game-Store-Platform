import React, { useEffect, useState, useRef } from 'react'
import '../css/Browse.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import Gamecard from '../components/Gamecard';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Browse() {
  const [search, setSearch] = useState("")
  const [selectedGenre, setSelectedGenre] = useState(false)
  const [selectedType, setSelectedType] = useState(false)
  const [selectedDate, setSelectedDate] = useState(false)
  const [selectedOther, setSelectedOther] = useState(false)
  const [gameArray, setGameArray] = useState([])
  const [allGames, setAllGames] = useState([]);
  const [width, setWidth] = useState(null);

  const widthRef = useRef(null);

  const gameGenres = [
    "Action",
    "Adventure",
    "RPG",
    "Simulation",
    "Strategy",
    "Sports",
    "Racing",
    "Fighting",
    "Puzzle",
    "Platformer",
    "Shooter",
    "Survival",
    "Horror",
    "Sandbox",
    "Stealth",
    "MMORPG",
    "MOBA",
    "Battle Royale",
    "Metroidvania",
    "Rhythm",
    "Visual Novel",
    "Party",
    "Card Game",
    "Idle",
    "Roguelike",
    "Tower Defense",
    "Educational",
    "Turn-Based Tactics",
    "Interactive Story",
    "Text Adventure"
  ];

  const initialFetch = async () => {
    try {
      const initialData = await axios.get('http://localhost:8000/api/database/browsegames')
      const mappedGames = initialData.data.gameInfo.map(game => ({
        title: game.gameName,
        creator: game.teamName,
        image: game.imageUrl,
        genres: game.selectedGenres
      }));
      setAllGames(mappedGames);
      setGameArray(mappedGames);

    }
    catch (err) {
      toast.error('Error retreiving the data for this search' + err.message, {
        position: 'top-center', autoClose: 3000,
      });

    }
  }

  useEffect(() => {
    initialFetch();
    setWidth((widthRef.current.offsetWidth - 30) / 3)
  }, [])



  const handleSelected = (selection) => {

    if (selection === "Genre") {
      setSelectedGenre((prev) => !prev)
      setSelectedType(false)
      setSelectedDate(false)
      setSelectedOther(false)
    }
    else if (selection === "Type") {
      setSelectedType((prev) => !prev)
      setSelectedDate(false)
      setSelectedOther(false)
      setSelectedGenre(false)
    }
    else if (selection === "Other") {
      setSelectedOther((prev) => !prev)
      setSelectedType(false)
      setSelectedDate(false)
      setSelectedGenre(false)
    }
    else if (selection === "Date") {
      setSelectedDate((prev) => !prev)
      setSelectedType(false)
      setSelectedOther(false)
      setSelectedGenre(false)
    }
    return
  }

  const browseGamesBySearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      setGameArray(allGames);
      return
    }
    const searchGame = allGames.filter(item =>
      item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setGameArray(searchGame);
  }

  const genreSelection = () => {

  }


  return (
    <div className='background-browse'>
      <ToastContainer />
      <div className='inner-content-browse'>
        <div className='left-browse-section'>
          <div className='top-browse'>
            <h3>Search</h3>
            <input id="search-input" onChange={(e) => browseGamesBySearch(e.target.value)} type='text' placeholder='Search for a game...' />
            <div className="skinny-white-bar-browse"></div>
            <div className='dropdown-browse'>
              <div className='inner-genre'>
                <h4>Genre</h4>
                <RiArrowDropDownLine className={`arrow-down ${selectedGenre ? 'rotate-up' : ''}`} onClick={() => handleSelected("Genre")} />
              </div>
              {selectedGenre ?
                <div className='dropdown-genre-section'>
                  <h2>Select up to 3 Genres</h2>
                  {gameGenres.map((item, index) => (
                    <div>
                      <h2>{item}</h2>
                    </div>
                  ))}
                </div>
                : <></>}
            </div>
            <div className="skinny-white-bar-browse"></div>
            <div className='dropdown-browse'>
              <div className='inner-genre'>
                <h4>Project type</h4>
                <RiArrowDropDownLine className={`arrow-down ${selectedType ? 'rotate-up' : ''}`} onClick={() => handleSelected("Type")} />
              </div>
              {selectedType ?
                <div className='dropdown-genre-section'>
                  <h2>Select up to 3 Genres</h2>
                </div>
                : <></>}
            </div>
            <div className="skinny-white-bar-browse"></div>
            <div className='dropdown-browse'>
              <div className='inner-genre'>
                <h4>Release date</h4>
                <RiArrowDropDownLine className={`arrow-down ${selectedDate ? 'rotate-up' : ''}`} onClick={() => handleSelected("Date")} />
              </div>
              {selectedDate ?
                <div className='dropdown-genre-section'>
                  <h2>Select up to 3 Genres</h2>
                </div>
                : <></>}
            </div>
            <div className="skinny-white-bar-browse"></div>
            <div className='dropdown-browse'>
              <div className='inner-genre'>
                <h4>Other</h4>
                <RiArrowDropDownLine className={`arrow-down ${selectedOther ? 'rotate-up' : ''}`} onClick={() => handleSelected("Other")} />
              </div>
              {selectedOther ?
                <div className='dropdown-genre-section'>
                  <h2>Select up to 3 Genres</h2>
                </div>
                : <></>}
            </div>
            <div className="skinny-white-bar-browse"></div>
          </div>
          <div className='bottom-page'>

          </div>
        </div>
        <div ref={widthRef} className='right-games-section'
        >
          <div className='scrollable-browse'>
            {gameArray.length >= 1 ?
              gameArray.map((value, index) => (
                <Gamecard key={index} image={value.image} title={value.title} creator={value.creator} width={width} />
              ))
              :
              <h2>Sorry, no games found please adjust your search.</h2>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default Browse
