import React from 'react'

const MovieList = ({ movie, handleMovieDetail }) => {

    const setID = () => {
        handleMovieDetail(movie.imdbID);
    }

    return (
        <div className='movieList' onClick={setID}>
            <div>
                <img src={`${movie.Poster}`} alt="" id='poster' />
            </div>
            <div id='data'>
                {movie.Title}
                <p>📅 {movie.Year}</p>
            </div>
        </div>
    )
}

export default MovieList
