import { useNavigate } from 'react-router-dom';
import guessSound from './Sound/guess_sound.mp3'

const Error = () => {
    const navigate = useNavigate()
    console.log('Error rendered')
  return (
    <section className='container'>
      <h1>Error, Please Sign In</h1>
      <br></br>
      <br></br>
      <br></br>
      <button type="button" onClick={()=> {navigate('/'); new Audio(guessSound).play()}}>Go Home</button>
    </section>
  );
};
export default Error;
