import { useNavigate } from 'react-router-dom';
const ServerError = () => {
  console.log('server.js rendered')
    const navigate = useNavigate()
  return (
    <section className='container'>
      <h1>Server Error</h1>
      <br></br>
      <br></br>
      <br></br>
      <button type="button" onClick={()=> navigate('/game')}>Refresh Game</button>
    </section>
  );
};
export default ServerError;
