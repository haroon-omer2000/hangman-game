import React from 'react';

const header = ({currentQuestion,words}) =>{
    return (
        <>
            {/* <img src="https://ptcl.com.pk/images/PressReleasePTCL%20logo.jpg" style={{height: "100px",width:"250px",backgroundColor:"transparent"}} />
            <div style={{color:"black"}} > */}
                <h1>Hangman</h1>
                <p>Find the hidden word - Enter a letter</p>
                <p>Question {currentQuestion + 1}/{words.length}</p>
            {/*</div>*/}
        </>
    );
}

export default header;