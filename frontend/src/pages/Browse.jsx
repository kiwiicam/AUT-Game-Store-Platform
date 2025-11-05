import React, { useEffect, useState, useRef } from 'react'
import '../css/Browse.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import Gamecard from '../components/Gamecard';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Browse() {

  const backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

  const [selectedGenre, setSelectedGenre] = useState(false);
  const [selectedType, setSelectedType] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const [selectedOther, setSelectedOther] = useState(false);

  const [gameArray, setGameArray] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [theSelectedGenre, setTheSelectedGenre] = useState(null);
  const [theSelectedType, setTheSelectedType] = useState(null);
  const [search, setSearch] = useState("");
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);


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

  const projectTypes = [
    "Individual Game Project",
    "Group Game Project"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  );


  const initialFetch = async () => {
    try {
      const initialData = await axios.get(`${backend_url}/database/browsegames`)
      const mappedGames = initialData.data.gameInfo.map(game => ({
        title: game.gameName,
        creator: game.teamName,
        image: game.imageUrl,
        genres: game.selectedGenres,
        type: game.projectType,
        year: new Date(game.releaseDate).getFullYear(),
        likes: game.likes
      }));
      const bigList = [...mappedGames];
      setAllGames(bigList);
      setGameArray(bigList);

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

  const filterResults = (searchQuery, genre, type) => {
    let filtered = allGames;

    if (genre) {
      filtered = filtered.filter(game => game.genres.includes(genre));
    }

    if (type) {
      filtered = filtered.filter(game => game.type === type)
    }

    if (startYear && endYear) {
      filtered = filtered.filter(game => {
        return game.year >= startYear && game.year <= endYear;
      })
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    setGameArray(filtered);
  }

  const searchChange = (searchQuery) => {
    setSearch(searchQuery);
    filterResults(searchQuery, theSelectedGenre, theSelectedType, startYear, endYear);
  }

  const genreSelection = (genre) => {
    if (theSelectedGenre === genre) {
      setTheSelectedGenre(null);
      filterResults(search, null, theSelectedType);
      return;
    }
    setTheSelectedGenre(genre);
    filterResults(search, genre, theSelectedType);
  }

  const typeSelection = (type) => {
    if (theSelectedType === type) {
      setTheSelectedType(null);
      filterResults(search, theSelectedGenre, null);
      return;
    }
    setTheSelectedType(type);
    filterResults(search, theSelectedGenre, type);
  }


  const sortByLike = () => {
    const sorted = [...gameArray].sort((a, b) => {
      return b.likes - a.likes;
    });
    setGameArray(sorted);
  }

  const sortByRandom = () => {
    const shuffled = [...gameArray].sort(() => Math.random() - 0.5);
    setGameArray(shuffled);
  }


  return (
    <div className='background-browse'>
      <ToastContainer />
      <div className='inner-content-browse'>
        <div className='left-browse-section'>
          <div className='top-browse'>
            <h3>Search</h3>
            <input id="search-input" onChange={(e) => searchChange(e.target.value)} type='text' placeholder='Search for a game...' />
            <div className="skinny-white-bar-browse"></div>
            <div className='dropdown-browse'>
              <div className='inner-genre'>
                <h4>Genre</h4>
                <RiArrowDropDownLine className={`arrow-down ${selectedGenre ? 'rotate-up' : ''}`} onClick={() => handleSelected("Genre")} />
              </div>
              {selectedGenre ?
                <div className='dropdown-genre-section'>
                  <h2>Please select a genre </h2>
                  <div id="genre">
                    {gameGenres.map((item, index) => (
                      <div className={theSelectedGenre === item ? 'genre-item-browse-selected' : 'genre-item-browse'} onClick={() => genreSelection(item)}>
                        <h2 className='genre-h2'>{item}</h2>
                        <div className="genre-icon">
                          <img src={'https://deployment-test.d2mwlph9qkry2s.amplifyapp.com/genre_icons/' + item.toLowerCase().toString().replace(/\s+/g, '') + '.png'} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                : <></>}
            </div>
            <div className="skinny-white-bar-browse"></div>
            <div className='dropdown-browse'>
              <div className='inner-genre'>
                <h4>Project Type</h4>
                <RiArrowDropDownLine className={`arrow-down ${selectedType ? 'rotate-up' : ''}`} onClick={() => handleSelected("Type")} />
              </div>
              {selectedType ?
                <div className='dropdown-genre-section'>
                  <h2>Choose a project type</h2>
                  <div id="type">
                    {projectTypes.map((item, index) => (
                      <div
                        key={index}
                        className={theSelectedType === item ? 'genre-item-browse-selected' : 'genre-item-browse'}
                        onClick={() => typeSelection(item)}
                      >
                        <h2 className='genre-h2'>{item}</h2>

                      </div>
                    ))}
                  </div>
                </div>
                : <></>}
            </div>
            <div className="skinny-white-bar-browse"></div>
            <div className='dropdown-browse'>
              <div className='inner-genre'>
                <h4>Release Date</h4>
                <RiArrowDropDownLine className={`arrow-down ${selectedDate ? 'rotate-up' : ''}`} onClick={() => handleSelected("Date")} />
              </div>
              {selectedDate ?
                <div className='dropdown-genre-section'>
                  <h2>Search by date range</h2>
                  <div className="date-range-selectors">
                    <div className="date-select">
                      <h2>Start Year</h2>
                      <select
                        value={startYear || ""}
                        onChange={(e) => {
                          const year = parseInt(e.target.value);
                          setStartYear(year);
                          filterResults(search, theSelectedGenre, theSelectedType, year, endYear);
                        }}
                      >
                        <option value="">--</option>
                        {years.map((y, idx) => (
                          <option key={idx} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    <div className="date-select">
                      <h2>End Year</h2>
                      <select
                        value={endYear || ""}
                        onChange={(e) => {
                          const year = parseInt(e.target.value);
                          setEndYear(year);
                          filterResults(search, theSelectedGenre, theSelectedType, startYear, year);
                        }}
                      >
                        <option value="">--</option>
                        {years.map((y, idx) => (
                          <option key={idx} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                : <></>}
            </div>
            <div className="skinny-white-bar-browse"></div>
            <div className='dropdown-browse'>
              <div className='inner-genre'>
                <h4>Other Filters</h4>
                <RiArrowDropDownLine className={`arrow-down ${selectedOther ? 'rotate-up' : ''}`} onClick={() => handleSelected("Other")} />
              </div>
              {selectedOther ?
                <div className='dropdown-genre-section'>
                  <h2>Sort by likes or randomise search.</h2>
                  <div className='sort-buttons'>
                    <div className='other-sort' onClick={() => sortByLike()}>
                      <h4>Sort by Most Liked</h4>
                    </div>
                    <div className='other-sort' onClick={() => sortByRandom()}>
                      <h4>Randomize the Search</h4>
                    </div>
                  </div>
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
