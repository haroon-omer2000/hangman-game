import React, {useEffect} from 'react';
import {checkWin} from '../helpers/helpers';

let check = false;

const Popup = ({correctLetters,wrongLetters,setPlayable,selectedWord, playAgain, currentQuestion, words, score, setScore}) => {
    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;
    let gameOver = false;

    function updateScore(){
        if(!check){
            check = true;
            setScore(score => (score + 1));
        }
    };

    if ((checkWin(correctLetters,wrongLetters,selectedWord) === 'win') && (currentQuestion < words.length -1)){
        finalMessage = 'Congratulations, you guessed it right!';
        playable = false;
        updateScore();
    } else if ((checkWin(correctLetters,wrongLetters,selectedWord) === 'lose') && (currentQuestion < words.length -1)){
        finalMessage = 'Unfortunately, you could not guess it.';
        finalMessageRevealWord = `... the word was ${selectedWord.toUpperCase()}`;
        playable = false;
    } else if ( (checkWin(correctLetters,wrongLetters,selectedWord) === 'lose') && (currentQuestion === words.length -1)){
        finalMessage = 'Unfortunately, you could not guess it.';
        finalMessageRevealWord = `... the word was ${selectedWord.toUpperCase()}, You scored ${score} out of ${words.length}`;
        gameOver = true;
        playable = false;
    }else if((checkWin(correctLetters,wrongLetters,selectedWord) === 'win') && (currentQuestion === words.length -1 )){
        finalMessage = 'Congratulations, you guessed it right!';
        finalMessageRevealWord = `You scored ${score} out of ${words.length}`;
        gameOver = true;
        playable = false;
        updateScore();
    }

    useEffect(() => {
        setPlayable(playable)
        if(playable)
            check = false;
        else
            check = true;
    });

    return (
        <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}} >
            <div className="popup">
                <h2>{finalMessage}</h2>
                <h3>{finalMessageRevealWord}</h3>
                <button onClick={() => playAgain(gameOver)}>{(!gameOver)?"Next Word":"Start Over"}</button>
            </div>
         </div>    
    );
}

export default Popup;
