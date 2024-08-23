import React from 'react'

const WatchSummary = ({ dummyWatch, avgImdbrating, userRating, avgruntime }) => {
    return (
        <div className='summary'>
            <h4 className='heading'>MOVIES YOU WATCHED</h4>
            <div>
                <div id="summarydata">
                    <p>🎬{dummyWatch.length} </p>
                    <p>⭐{avgImdbrating ? avgImdbrating.toFixed(2) : 0}</p>
                    <p>🌟{userRating ? userRating.toFixed(2) : 0}</p>
                    <p>⌛{avgruntime ? avgruntime : 0}</p>
                </div>
            </div>
        </div>
    )
}

export default WatchSummary
