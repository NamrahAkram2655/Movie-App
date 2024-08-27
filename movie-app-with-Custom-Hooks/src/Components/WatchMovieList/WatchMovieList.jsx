import React from 'react'

const WatchMovieList = ({ item, deleteHandler }) => {
    return (
        <div className='watchdata'>
            <div className='watchMovie'>
                <div>
                    <img src={`${item.Poster}`} alt="" id="poster" />
                </div>
                <div id='data1'>
                    {item.Title}
                    <div className="data2">
                        <p>⭐ {item.imdbRating}</p>
                        <p>🌟 {item.userRating}</p>
                        <p>⌛ {item.runtime}</p>
                    </div>
                </div>
            </div>
            <button id='btn' onClick={() => deleteHandler(item.imdbID)}>❌</button>
        </div>
    )
}

export default WatchMovieList
