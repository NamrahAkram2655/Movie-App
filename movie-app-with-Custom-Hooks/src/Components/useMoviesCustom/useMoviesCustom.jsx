import { React, useEffect, useState } from 'react'

function useMoviesCustom(query) {

    const [movies, setMovie] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

    return { movies, loading, error };
}

export default useMoviesCustom
