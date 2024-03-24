import '../style.css'
import {useState} from 'react';
import useSignIn from '../form-functions/getSignInUp';
import { useNavigate } from 'react-router-dom';
import guessSound from '../Sound/guess_sound.mp3'
import MessageComponent from '../form-functions/messageComponent';


export default function SignIn(){
  console.log('sign-in .js rendered')
  const navigate = useNavigate()
  const { handleSubmit } = useSignIn();
  const [isEmpty, setIsEmpty] = useState(false);
  const [message,setMessage] = useState('')

  const checkIsEmpty = (msg) => {
   setIsEmpty(!isEmpty)
   setMessage(msg)
  }

  return <>
    <div className='signIn-container'>
      <h1>Welcome</h1>
      <form className='form' onSubmit={handleSubmit('signin',checkIsEmpty)}>
      <label >Email</label>
        <input 
          type='email'
          name='email'
          onChange={(e) => e.target.value = e.target.value.toLowerCase()} 
          placeholder='email' 
          autoFocus
          />
          <label>Password</label>
        <input 
          type='password'
          name='password'
          placeholder='password'  
        />
      <button type="submit">Enter Game</button>
      </form>
      <button type="button" onClick={()=> {navigate('/signup'); new Audio(guessSound).play()} }>Sign Up?</button>

    </div>
    {isEmpty && <MessageComponent message={message} checkIsEmpty= {checkIsEmpty} />}
  </>

}