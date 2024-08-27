import React from 'react'
import MovieList from '../MovieList/MovieList'

const Moviee = ({ movies, isopen, setopen , handleMovieDetail}) => {


  return (

    <div>

      <p className='open' onClick={()=> setopen(!isopen)}>{isopen ? "+" : "-"}</p>

      {isopen && movies.map((movie) => {
        return <MovieList movie={movie} handleMovieDetail={handleMovieDetail}/>
      })}

    </div>
  )
}

export default Moviee
