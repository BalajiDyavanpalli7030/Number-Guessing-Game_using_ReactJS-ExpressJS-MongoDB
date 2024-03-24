import React from 'react';
import guessSound from '../Sound/guess_sound.mp3'
// import { useNavigate } from 'react-router-dom';
const MessageComponent = ({ message,checkIsEmpty}) => {
  console.log('MessageComponent rendered')
  return (<>
    <div className={`overlay ` }></div>
    <div className="popup">
      <h1>{message}</h1>
      <button onClick={()=>{checkIsEmpty() ;new Audio(guessSound).play()}}>Okay</button>
    </div>
  </>
  );
}

export default MessageComponent;
