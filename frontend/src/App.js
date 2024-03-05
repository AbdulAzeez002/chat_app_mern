
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import {Navigate, Route, Routes } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext';
import Header from './components/header/Header';

function App() {
  const {authUser}=useAuthContext()
  return (
    <>
    <Header/>
    <div className='px-4  flex flex-col bg-slate-400  '>

      <Routes>
          
         <Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>}/>
         <Route path='/login' element={authUser?<Navigate to='/'/>:<Login/>}/>
         <Route path='/signup' element={authUser?<Navigate to='/'/>:  <Signup/>}/>
      </Routes>
      <Toaster/>
        
    </div>
    </>
    
  );
}

export default App;
