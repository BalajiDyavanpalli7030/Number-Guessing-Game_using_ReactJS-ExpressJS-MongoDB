import getFormValues from "./getFormValues";
import guessSound from '../Sound/guess_sound.mp3'
import { useNavigate } from 'react-router-dom';


const useSignIn = () => {
  console.log('getSignInIUP.js called')
  const navigate = useNavigate()
  
  const handleSubmit = (urlProp,checkIsEmpty) => (e) => {
    new Audio(guessSound).play();
    e.preventDefault();
    const { isEmpty, data } = getFormValues(e.currentTarget);
    
    if (isEmpty) {
      checkIsEmpty('Please Enter All Values')
      return;
    }
    fetch('http://localhost:5000/auth/'+urlProp,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data_=>  {
      if (data_?.accessToken){
        localStorage.setItem('accessToken', data_.accessToken);
        localStorage.setItem('username', data_.username);
        checkIsEmpty(data_?.message)
        navigate('/game')
      }else{
        checkIsEmpty(data_?.message)
      }
    }    )
  
    .catch(error => checkIsEmpty('Server Error'));
    
  }

  return { handleSubmit };
}

export default useSignIn;
