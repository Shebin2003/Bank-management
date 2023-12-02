import './App.css';
import Depositpage from './Pages/Depositpage'
import Homepage from './Pages/Homepage'
import Loginpage from './Pages/Loginpage'
import Servicepage from './Pages/Servicepage'
import Transferpage from './Pages/Transferpage'
import Withdrawpage from './Pages/Withdrawpage'
import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' Component={Homepage}/>
          <Route path='/login' Component={Loginpage}/>
          <Route path='/services' Component={Servicepage}/>
          <Route path='/transfer' Component={Transferpage}/>
          <Route path='/withdraw' Component={Withdrawpage}/>
          <Route path='/deposit' Component={Depositpage}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
