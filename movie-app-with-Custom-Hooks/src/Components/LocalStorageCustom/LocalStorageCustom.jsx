import { React, useState, useEffect } from 'react'

export default function LocalStorageCustom(initialState, key) {


    const [watchMovie, setWatchMovie] = useState(() => {
        const savedWatchMovie = localStorage.getItem(key);
        return savedWatchMovie ? JSON.parse(savedWatchMovie) : [];
    });

    //ye use eefect ka jut initial render pr chalay ga   //so that watched movies save rhay agr mai project band bhi kr du

    useEffect(function () {
        function savedata() {
            localStorage.setItem(key, JSON.stringify(watchMovie));
        }

        savedata();
    
    }, [watchMovie]);

    return [watchMovie, setWatchMovie];
}
