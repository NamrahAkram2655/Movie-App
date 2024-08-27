import React, { useEffect, useState } from 'react'
import StarRating from '../StarRating/StarRating';
import Loader from '../Loader/Loader';

const MovieDetail = ({ selectedID, setSelectedID, watchMovie, addWatchMovie }) => {

    const [movie, setMovie] = useState({});

    const [loading, setLoading] = useState(false);

    const [rating, setRating] = useState(0);

    useEffect(function () {
        async function getMovieDetails() {
            setLoading(true);
            const res = await fetch(
                `http://www.omdbapi.com/?&apikey=23a1ed6a&i=${selectedID}`);

            const data = await res.json();
            console.log(data);
            setMovie(data);
            setLoading(false);
        }

        getMovieDetails();
    }, [selectedID])


    const closeHandler = () => {
        setSelectedID(null);
    }


    useEffect(function () {

        function titleChange() {

            if (!movie.Title) {
                return;
            }
            document.title = "Title | " + movie.Title;
        }

        titleChange();

        return function () {
            document.title = "usePopcorn 🍿";
        }

    }, [movie.Title]);


    const addHandler = () => {
        //is object mai names k cases wahi rakhny jo dummy mai hai
        const newadd = {
            imdbID: selectedID,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            imdbRating: Number(movie.imdbRating),
            userRating: rating,
            runtime: movie.Runtime.split(' ').at(0)
        }
        addWatchMovie(newadd);
        closeHandler();
    }

    const isWatched = watchMovie.map((movie) => movie.imdbID).includes(selectedID);


    useEffect(function () {

        function callBack(e) {
            if (e.code === "Escape") {
                closeHandler();
            }
        }

        document.addEventListener("keydown", callBack);

        return function () {
            document.removeEventListener("keydown", callBack);
        }

    }, [closeHandler]);

    return (
        <div>
            {loading ? <Loader /> :
                <>
                    <div id='detail'>
                        <img src={`${movie.Poster}`} alt="" id='posterDetail' />

                        <p className='title'>
                            {movie.Title}

                            <p className='data'>
                                {movie.Released} - {movie.Runtime}
                                <p> {movie.Genre}</p>
                                <p>{movie.imdbRating} ImdbRating</p>
                            </p>
                        </p>
                    </div>
                    <div className='rate'>
                        {!isWatched ?
                            <> <StarRating maxRating={10} size='23px' rating={rating} setRating={setRating} />

                                {rating > 0 && <button id='btnadd' onClick={addHandler}>&larr; Add To Wathced List</button>} </>
                            : <p className='already'>You have already rated this movie </p>}
                    </div>
                    <div className='dataDetail'>
                        <em>{movie.Plot}</em>
                        <p>Starring {movie.Actors}</p>
                        <p>Directed by {movie.Director}</p>
                        Year {movie.Year}
                    </div>
                </>
            }

        </div>
    )
}

export default MovieDetail
