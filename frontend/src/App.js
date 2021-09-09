import './App.css';
import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import React from 'react';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import {showNotification as show} from './helpers/helpers';
import Popup from './components/Popup';
import Notification from './components/Notification';
import Score from './components/Score';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import Instructions from './components/Instructions';
import GuestLogin from './components/GuestLogin';
import EmployeeLogin from './components/EmployeeLogin';

let selectedWord = '';
  
function App() {

  const [playable,setPlayable] = useState(true);
  const [wrongLetters,setWrongLetters] = useState([]);
  const [correctLetters,setCorrectLetters] = useState([]);
  const [showNotification,setShowNotification] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const [wordsLoaded,setWordsLoaded] = useState(false);
  const [user,setUser] = useState({"email":"","emp_id":"","attempt_no":"","as_guest":false,"name":"","guest_id":""})

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const changeView = (isGuest) => {
    setUser({...user,as_guest:isGuest});
  }

  const Login = (details) =>{

      setUser({
        email : details.email,
        emp_id : details.emp_id,
        as_guest : details.as_guest,
        name : details.name
      });

      let email = details.email;
      let emp_id = details.emp_id;
      let as_guest = details.as_guest;
      let name = details.name;
      let attempt_no = details.attempt_no;

      const userDetails={
        email,
        emp_id,
        as_guest,
        name,
        attempt_no
      };

      const response = fetch('/enter_user',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(userDetails)
      }).then(response=>response.json().then(data=>{

        setUser({...user,
          guest_id:data['id'],
          name : details.name,
          as_guest : details.as_guest,
          email : details.email,
          emp_id : details.emp_id,
          attempt_no : data['attempt_no']
        });

        setWords(data['words']);
        setWordsLoaded(true);

      }));
                
  }

  function handleInput(key){
    const letter = key.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters(correctLetters => [...correctLetters, letter])
      } else {
        show(setShowNotification);
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters(wrongLetters => [...wrongLetters, letter])
      } else {
        show(setShowNotification);
      }
    }
  }

  const onKeyPress = key => {
    let keyCode = key.toUpperCase().charCodeAt();

    console.log(user.name);

    if (key === "{shift}" || key === "{lock}") handleShift();

    else if(playable && keyCode >= 65 && keyCode <= 90) 
      handleInput(key);
  };
    

  useEffect(()=>{
    if(words.length!==0){
      selectedWord = words[currentQuestion];
    }
  },[words])

  if(words.length!==0){
    selectedWord = words[currentQuestion];
  }

  const quitGame = () => {
      
    setPlayable(true);

    setWords([]);

    setCurrentQuestion(0);
    setScore(0);

    setCorrectLetters([]);
    setWrongLetters([]);

    setUser({...user,
      email : "",
      emp_id : "",
      as_guest : false,
      name : "", 
      guest_id : "",
      attempt_no : ""
    });
  }

  const playAgain = (gameOver) => {
    
    setPlayable(true);

    if(!gameOver){
      let nextQuestion = currentQuestion + 1;
      if(nextQuestion < words.length){
        selectedWord = words[nextQuestion];
        setCurrentQuestion(nextQuestion);
      }else{
        setCurrentQuestion(nextQuestion);
      }
    }

    else{
            
      let email = user.email;
      let emp_id = user.emp_id;
      let as_guest = user.as_guest;
      let name = user.name;

      setWords([]);
      setWordsLoaded(false);
      setUser({attempt_no:""})

      let attempt_no = "";

      const userDetails={
        email,
        emp_id,
        as_guest,
        name,
        attempt_no
      };

      const response = fetch('/enter_user',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(userDetails)
      }).then(response=>response.json().then(data=>{
                            
          setUser({...user,
            guest_id : data['id'],
            attempt_no : data['attempt_no']
          });

          setWords(data['words']);
          setWordsLoaded(true);

      }));
        setCurrentQuestion(0);
        setScore(0);
    }
      setCorrectLetters([]);
      setWrongLetters([]);
  }
  
  return (

      (user.email !== "" || user.guest_id !== "") ? (
      
      <div className="App">
      
        <Header currentQuestion={currentQuestion} words={words} wordsLoaded={wordsLoaded} />
        <WrongLetters wrongLetters={wrongLetters} />
      
        <div className="App">          
      
          <Figure wrongLetters={wrongLetters} />
      
          {(words.length !== 0)? <Word selectedWord={selectedWord} correctLetters={correctLetters} /> : false}

          {(showNotification)?<Notification showNotification={showNotification}/> : false}

          {(words.length !== 0)?
            
            <div>
             
              <div className="App">
                <Score score={score} words={words}/>
              </div>

              <div className="Keyboard">
                <Keyboard keyboardRef={r => (keyboard.current = r)} layoutName={layout} onKeyPress={onKeyPress}/>
              </div>

              <Popup user={user} correctLetters={correctLetters} wrongLetters={wrongLetters} setPlayable={setPlayable} 
              selectedWord={selectedWord} playAgain={playAgain} currentQuestion={currentQuestion} words={words} score={score} setScore={setScore} quitGame={quitGame} />      
            
            </div>

          :false}    

        </div>

      </div>
    ): ( 
        <div> 

            { user.emp_id === "" && user.guest_id === "" ? 
              
              <div>
      
                <Instructions /> 
      
                { user.as_guest===false  ? 
                
                  <div>
                    <EmployeeLogin Login={Login} changeView={changeView} />
                  </div>
                : <GuestLogin Login={Login} changeView={changeView} />
                }

              </div>

              : false
            }

        </div>
      )
  );
}

export default App;
