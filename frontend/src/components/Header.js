import React from 'react';

const header = ({currentQuestion,words}) =>{
    return (
        <>
                <h1>Hangman</h1>
                <p>Find the hidden word - Enter a letter</p>
                <p>Question {currentQuestion + 1}/{words.length}</p>
        </>
    );
}

export default header;