import React, {useEffect,useState} from 'react';
import {checkWin} from '../helpers/helpers';

let check = false;

const Popup = ({user,correctLetters,wrongLetters,setPlayable,selectedWord, playAgain, currentQuestion, words, score, setScore, quitGame}) => {

    let finalMessage = '';
    let finalMessageRevealWord = '';
    let playable = true;
    let gameOver = false;

    const isWin = (((checkWin(correctLetters,wrongLetters,selectedWord) === 'win') && (currentQuestion < words.length -1)) || ((checkWin(correctLetters,wrongLetters,selectedWord) === 'win') && (currentQuestion === words.length -1 )));

    useEffect(() => {

        if (isWin) {

            check = true;

            // updating score in database
            let new_score = score + 1;

            setScore((score) => score + 1);          

            let id = NaN;
            let isGuest = user.as_guest;
            let attempt_no = user.attempt_no;

            if(user.as_guest === true)
                id = user.guest_id;
            else
                id = user.emp_id;

            const scoreDetails={
                new_score,
                id,
                isGuest,
                attempt_no
            };

            const response = fetch('/update_score',{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(scoreDetails)
            }).then(response=>response.json().then(data=>{                                    
                console.log('Recieved Status: ',data['status']);
            }));

        }
      }, [isWin, setScore]);


    if ((checkWin(correctLetters,wrongLetters,selectedWord) === 'win') && (currentQuestion < words.length -1)){
        finalMessage = 'Congratulations, you guessed it right!';
        playable = false;
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
                <h2 className="popup_word">{finalMessage}</h2>
                <h3 className="popup_word">{finalMessageRevealWord}</h3>
                <button onClick={() => playAgain(gameOver)}>{(!gameOver)?"Next Word":"Start Over"}</button><br/>
                {gameOver === true ? <button onClick={()=> quitGame()}>Quit</button> : false}
            </div>
         </div>    
    );
}

export default Popup;
