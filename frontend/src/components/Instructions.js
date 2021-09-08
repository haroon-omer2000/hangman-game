import React from 'react'

const Instructions = () => {
    return (
        <div className="Instructions-Page">
            <h1 className="input-label">Instructions</h1>
            <p style={{'color':'red'}}>Carefully read the following instructions.</p>
            <ol>
                <li className="instructions">1. Enter your PTCL Email as well as Employee ID correctly below.</li>
                <li className="instructions">2. There are 5 words and you will have 6 attempts to guess each word correctly.</li>
                <li className="instructions">3. Your first attempt will be considered only.</li>
                <li className="instructions">4. Incase you refresh or quit the page, your progress uptil that point will be considered.</li>
            </ol>
        </div>
    )
}

export default Instructions;
