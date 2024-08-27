import { useEffect, useState } from 'react';
import './App.css';
import Moviee from './Components/Moviee/Moviee';
import Navbar from './Components/Navbar/Navbar';
import WatchMovie from './Components/WatchMovie/WatchMovie';
import Loader from './Components/Loader/Loader';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage';
import MovieDetail from './Components/MovieDetail/MovieDetail';

function App() {

  const dummyData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
      imdbID: "tt6751668",
      Title: "Parasite",
      Year: "2019",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
  ];

  const dummyWatch = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
    },
    {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
    },
  ];

  const [isopen, setopen] = useState(true);
  const [movies, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");


  const [watchMovie, setWatchMovie] = useState(() => {
    const savedWatchMovie = localStorage.getItem('watchMovie');
    return savedWatchMovie ? JSON.parse(savedWatchMovie) : [];
  });

  //ye use eefect ka jut initial render pr chalay ga   //so that watched movies save rhay agr mai project band bhi kr du

  useEffect(function () {
    function savedata() {
      localStorage.setItem("watchMovie", JSON.stringify(watchMovie));
    }

    savedata();

  }, [watchMovie]);


  const average = (numbers) => {
    const total = numbers.reduce((acc, num) => acc + num, 0);
    return total / numbers.length;
  };

  const avgImdbrating = average(watchMovie.map((item) => item.imdbRating));
  const userRating = average(watchMovie.map((item) => item.userRating));
  const avgruntime = average(watchMovie.map((item) => item.runtime));

  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const handleMovieDetail = (id) => {
    setSelectedID((selectedID) => id === selectedID ? null : id);
  }

  useEffect(function () {

    const controller = new AbortController();

    async function FetchMovies() {

      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=23a1ed6a&s=${query}`);

        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error("Movies not found");
        }

        console.log(data);

        setMovie(data.Search);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }

      if (query.length < 3) {
        setMovie([]);
        setError("");
        return;
      }
    }
    FetchMovies();

    return function () {
      controller.abort();
    }

  }, [query]);

  function addWatchMovie(movie) {
    setWatchMovie(watchMovie => [...watchMovie, movie]);
  }

  const deleteHandler = (imdbID) => {
    const newData = watchMovie.filter((movie) => {
      return movie.imdbID !== imdbID;
    });

    setWatchMovie(newData);
  }

  return (
    <div>
      <Navbar query={query} setQuery={setQuery} movies={movies} />
      <div className='items'>

        <div className='list'>

          {loading && <Loader />}

          {!loading && !error && <Moviee movies={movies} isopen={isopen} setopen={setopen} setSelectedID={setSelectedID} handleMovieDetail={handleMovieDetail} />}

          {error && <ErrorMessage error={error} />}

        </div>

        <div className='watch'>
          {selectedID ?
            <MovieDetail selectedID={selectedID} setSelectedID={setSelectedID} addWatchMovie={addWatchMovie} watchMovie={watchMovie} />
            :
            <WatchMovie watchMovie={watchMovie} avgImdbrating={avgImdbrating} userRating={userRating} avgruntime={avgruntime} deleteHandler={deleteHandler} />}
        </div>

      </div>
    </div>
  );
}

export default App;
