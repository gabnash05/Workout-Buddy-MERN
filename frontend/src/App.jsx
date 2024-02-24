import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext } from 'react';


function App() {

  const {user} = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />}></Route>
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />}></Route>
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;