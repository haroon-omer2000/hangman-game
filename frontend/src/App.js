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
import LoginForm from './components/LoginForm';

const apiurl = 'https://random-word-api.herokuapp.com/word?number=10&swear=0';

let selectedWord = '';
  
function App() {


  const [message,setMessage] = useState('');
  const [playable,setPlayable] = useState(true);
  const [wrongLetters,setWrongLetters] = useState([]);
  const [correctLetters,setCorrectLetters] = useState([]);
  const [showNotification,setShowNotification] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState([]);
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const [user,setUser] = useState({"name":""})
  const [flag,setFlag] = useState();

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const Login = (details) =>{
    console.log(details);

    if(details.name !==""){
      setUser({
        name : details.name
      });

      let name = details.name;

      const response = fetch('/enter_user',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(name)
      });
      
      console.log(response);
      
    }
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
  


  useEffect(() => {
    fetch("/api").then(response=>response.json().then(data=>{
        console.log(data);
        setMessage(data['tutorial']);
      }))
    }, []);
  

  useEffect(()=>{
    fetch(apiurl).then((data) => 
      data.json()).then(data=>{
        setWords(data);
      })
  },[]);

  useEffect(()=>{
    if(words.length!==0){
      selectedWord = words[currentQuestion];
    }
  },[words])

  if(words.length!==0){
    selectedWord = words[currentQuestion];
    //console.log('word selected is: ',selectedWord);
  }


  const playAgain=(gameOver)=>{
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
      fetch(apiurl).then((data) => 
      data.json()).then(data=>{
        setWords(data);
      });
      setCurrentQuestion(0);
      setScore(0);
    }
      // clear arrays
      setCorrectLetters([]);
      setWrongLetters([]);
  }
  
  return (

      (user.name != "") ? (
      <div className="App">
        <h1>New_Name:={user.name}=</h1>
        <Header currentQuestion={currentQuestion} words={words} />
        <WrongLetters wrongLetters={wrongLetters} />
      
        <div className="App">          
          <Figure wrongLetters={wrongLetters} />
          {(words.length!==0)?
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
          :false}
          {(showNotification)?
          <Notification showNotification={showNotification}/>
          : false}

      {(words.length!==0)?
      <div>
        <div className="App">
          <Score score={score} words={words}/>
        </div>

        <div className="Keyboard">
          <Keyboard
            keyboardRef={r => (keyboard.current = r)}
            layoutName={layout}
            onKeyPress={onKeyPress}/>
        </div>

      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} setPlayable={setPlayable} 
       selectedWord={selectedWord} playAgain={playAgain} currentQuestion={currentQuestion} words={words} score={score} setScore={setScore} />      
      </div>
      :false}      
      </div>
    </div>
    ): ( <LoginForm Login={Login} /> )
  );
}

export default App;
