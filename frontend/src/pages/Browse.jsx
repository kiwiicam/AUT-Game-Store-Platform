import React, { useEffect, useState } from 'react'
import '../css/Browse.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import Gamecard from '../components/Gamecard';

function Browse() {
  const [search, setSearch] = useState("")
  const [selectedGenre, setSelectedGenre] = useState(false)
  const [selectedType, setSelectedType] = useState(false)
  const [selectedDate, setSelectedDate] = useState(false)
  const [selectedOther, setSelectedOther] = useState(false)
  const [gameArray, setGameArray] = useState([])

  useEffect(() => {
    setGameArray([
      { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
      { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
      { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
      { image: "https://i.redd.it/q4fjauk2ebc31.png", title: "Mincecraft LOL", creator: "Mojang" },
    ])
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


  return (
    <div className='background-browse'>
      <div className='inner-content-browse'>
        <div className='left-browse-section'>
          <div className='top-browse'>
            <h3>Search</h3>
            <input id="search-input" value={search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search for a game...' />
            <div className="skinny-white-bar-browse"></div>
            <div className='dropdown-browse'>
              <div className='inner-genre'>
                <h4>Genre</h4>
                <RiArrowDropDownLine className={`arrow-down ${selectedGenre ? 'rotate-up' : ''}`} onClick={() => handleSelected("Genre")} />
              </div>
              {selectedGenre ?
                <div className='dropdown-genre-section'>
                  <h2>Select up to 3 Genres</h2>
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
        <div className='right-games-section'>
          <div className='scrollable-browse'>
            {
              gameArray.map((value, index) => (
                <Gamecard key={index} image={value.image} title={value.title} creator={value.creator} width={50} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse
