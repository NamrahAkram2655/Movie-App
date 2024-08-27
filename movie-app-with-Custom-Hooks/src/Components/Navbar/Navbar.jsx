import React, { useEffect, useRef } from 'react'

const Navbar = ({ query, setQuery, movies }) => {

    const inputel = useRef("");

    useEffect(function () {
        function focusing(e) {

            if (document.activeElement === inputel.current) return;

            if (e.code === "Enter") {
                inputel.current.focus();
                setQuery("");
            }
        }
        document.addEventListener("keydown", focusing);

        return () => {
            document.removeEventListener("keydown", focusing);
        }
    }, []);


    return (
        <div>
            <nav id='nav'>
                <div id="logo">🍿 usePopcorn</div>
                <div>
                    <input type="text" placeholder='Enter movie name...' id='search' value={query} onChange={(e) => setQuery(e.target.value)}
                        ref={inputel} />
                    {/* useRef walay ko ref k sath hi pass krna hoga */}
                </div>
                <div id="end">Found {movies.length} top results</div>
            </nav>
        </div>
    )
}

export default Navbar
