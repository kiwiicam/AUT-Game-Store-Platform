import React, { useState } from 'react'
import '../css/Browse.css';

function Browse() {
  const [search, setSearch] = useState("")


  return (
    <div className='background-browse'>
      <div className='inner-content-browse'>
        <div className='left-browse-section'>
          <div className='top-browse'>
            <h3>Search</h3>
            <input id="search-input" value={search} onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Search for a game...' />
            <div className="skinny-white-bar"></div>
            <div>
              <h4>Genre</h4>
            </div>
            <div className="skinny-white-bar"></div>
            <div>
              <h4>Project type</h4>
            </div>
            <div className="skinny-white-bar"></div>
            <div>
              <h4>Release date</h4>
            </div>
            <div className="skinny-white-bar"></div>
            <div>
              <h4>Other</h4>
            </div>
            <div className="skinny-white-bar"></div>
          </div>
          <div className='bottom-page'>

          </div>
        </div>
        <div className='right-games-section'>

        </div>
      </div>
    </div>
  )
}

export default Browse
