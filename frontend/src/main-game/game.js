import React, { useState,useRef, useEffect}  from "react";
import PopUp from "./pop-up";
import '../style.css'
import { useNavigate } from 'react-router-dom';
import guessSound from '../Sound/guess_sound.mp3'
import winSound from '../Sound/win_sound.mp3';
import useCheckguess from "./check-guess";
import usefetchUserHistory from "./getPostData";

export default function Game() {
    console.log('Game.js Rendered')
    const navigate = useNavigate();
    const [name, setName] = useState()
    const [guessingNum, setGuessingNum] = useState('')
    const [message, setMessage] = useState('')
    const [winning, setwinning] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false);
    const [checkguess] = useCheckguess()
    const inpRef = useRef()
    useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setName(localStorage.getItem('username'))
    if (!accessToken) {
      navigate('/signin');
    }
  }, [navigate]);
   
  const audioRef = useRef(null);

    const playAudio = () => {
      audioRef.current.play();
    }
  
    const pauseAudio = () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset the audio to the beginning
    }
    

    const playGuessSound = () => {
      new Audio(guessSound).play();
    };

    function exitFullScreen() {
      if (document.fullscreenElement){

        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
}
const resetUserCredentials = () => {
  playGuessSound();
  exitFullScreen();
  localStorage.removeItem('accessToken'); // Remove access token from local storage
  localStorage.removeItem('username'); // Remove access token from local storage
  navigate('/');
};


    useEffect(()=>{
      if  (hideGame){
        inpRef.current.focus()
      } 
    })
  
  
  const handleGuess = ()=>{
    playGuessSound()
    
      const {message,winning} = checkguess(guessingNum,name)
      setMessage(message)
      setwinning(winning)
      setGuessingNum('')
      setShowPopUp(true);
      if (winning){
        playAudio()
      }
    }

    function handleKeyUp(e) {
      if (e.key === 'Enter' && !showPopUp) {
          e.preventDefault();
          playGuessSound()
          handleGuess();
      }
  }
  function handleGuessAgain() {
    playGuessSound();
    if (winning){
      pauseAudio()
    }
    setMessage('');
    setShowPopUp(false);
  }

  const [hideGame,setHideGame] = useState(false)
  const [hideHistory,setHideHistory] = useState(false)
  const element = document.documentElement;

  function startGame(){
    playGuessSound();
    setHideGame('hidden')
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { /* IE11 */
  element.msRequestFullscreen();
}
}



  const [userHistoryData,setUserHistoryData] = useState([])
  const [fetchUserHistory] = usefetchUserHistory()
  const viewUserHistory = async () => {
    playGuessSound();
    if (hideHistory){
      setHideHistory(!hideHistory)
      return
    }
    try {
      
      const data = await fetchUserHistory('GET',name)
      setUserHistoryData(data.history)
      setHideHistory(!hideHistory)
    } catch (error) {
      console.error('Error fetching user history:', error);
    }
  };

    return (
      <>
        <div className="mainContainer">
        <div id={"opening"} className={`popup ${hideGame}`}>
            <h1 className="mainContainer-h1">Welcome {name}</h1>
            <button onClick={startGame}>Play Game</button>
        </div>
        {hideGame &&(<div className="container">
            <h1>Number Guessing Game </h1>
            <input type="number" id="number" value={guessingNum} ref={inpRef} onKeyUp={handleKeyUp} onChange={(e)=> setGuessingNum(e.target.value) } disabled={showPopUp} autoFocus/>
            <button type="button" onClick={handleGuess}>Guess</button>
            <audio ref={audioRef} src={winSound} />
          </div>)
          }     
      
          {showPopUp  &&  <PopUp message={message} onGuessAgain={handleGuessAgain} winning={winning}/>}
          {hideGame && (<div className="navbar">
                            <button href="userHistory" onClick={viewUserHistory} >Game History</button>

                            <button href="userHistory" onClick={resetUserCredentials} >Quit Game</button>
                        </div>
            
            )}
          {hideHistory &&
          <><div id='userHistory' className="history-container container">
            {userHistoryData?.length === 0 && <h1>Play Your Game</h1> }
            {userHistoryData?.map((item,index) => (
              <h4 className="guess-count" key={index}>{`Guess Count: ${item}`}</h4>
              ))} 
              <button className="history-btn flex-item" onClick={viewUserHistory}>Close History</button>
              </div>
            
              </>
          }
          
    </div>
      </>
    )

    }