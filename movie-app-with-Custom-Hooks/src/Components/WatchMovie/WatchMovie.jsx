import React from 'react'
import WatchMovieList from '../WatchMovieList/WatchMovieList'
import WatchSummary from '../WatchSummary/WatchSummary'



const WatchMovie = ({ watchMovie, avgImdbrating, userRating, runtime, deleteHandler }) => {
  return (

    <div>
      <div>
        <WatchSummary dummyWatch={watchMovie} avgImdbrating={avgImdbrating} userRating={userRating} runtime={runtime} />
      </div>

      <div>
        {watchMovie.map((item) => {
          return <WatchMovieList item={item} deleteHandler={deleteHandler} />
        })}
      </div>

      {/* <StarRating /> */}

    </div>
  )
}

export default WatchMovie
