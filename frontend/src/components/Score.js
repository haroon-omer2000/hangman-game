import React from 'react'

const Score = ({score,words}) => {
    return (
        <div >
            <p>Score {score}/{words.length}</p>
        </div>
    )
}

export default Score;
