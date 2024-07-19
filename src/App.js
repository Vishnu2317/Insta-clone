import './App.css';
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import Navbar from './pages/Navbar';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import YourPosts from './pages/YourPosts';

function App() {

  const PrivateRouter = ({element}) =>{
    const [cookie,setCookie]= useCookies(["access_token"])
    const nav = useNavigate()
    useEffect(()=>{
      if(!cookie.access_token){
        nav('/login')
      }
    },[])
    return element
  }

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<PrivateRouter element={<Home/>}/>} />
      <Route path='/createpost' element={<PrivateRouter element={<CreatePost/>}/>} />
      <Route path='/yourposts' element={<PrivateRouter element={<YourPosts/>}/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;