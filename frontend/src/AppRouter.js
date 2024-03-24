import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import SignIn from './SignIn/sign-in';
import SignUp from './SignUp/sign-up';
import Game from './main-game/game';
import Error from './Error';
import Home from "./home";
import ServerError from './server-error';

const AppRouter = () => {
  console.log('AppRouter rendered')
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='signin' element={<SignIn/>} />
        <Route path='signup' element={<SignUp />} />
        <Route path="game" element={<Game/>}/>
        <Route path="server-error" element={<ServerError/>}/>
        <Route  path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;