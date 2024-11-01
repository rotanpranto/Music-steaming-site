import './App.css';
import { useEffect, useState, useRef } from 'react';
import Audioplayer from './components/Audioplayer/Audioplayer'
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import Navbar from "./components/Navbar/Navbar";
import Album from "./pages/Album/Album";
import About from "./pages/About";
import LandingPage from './pages/LandingPage';
import Signup from './pages/LoginSignUp/Signup';
import Login from './pages/LoginSignUp/Login';
import { useAuthContext } from './hooks/useAuthContext';
import Page404 from './pages/Page404';
import Apbar from './components/Audioplayer/ApBar/Apbar';
import Playlists from './pages/Playlists/Playlists';
import Playlist from './pages/Playlists/Playlist';

function App() {
  const { user } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false);
  const audioPlayer = useRef();   // reference our audio component
  useEffect(() => {

  }, [user])
  
  return (
    <div className="App">

    <Router>
      { !user &&
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<Signup />} />
      </Routes>}
      {user && (
        <div>
       <Navbar />
      <SideBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/album/:albumId' element={<Album />} />
          <Route path='/playlists' element={<Playlists />} />
          <Route path='/playlist/:playlistId' element={<Playlist />} />
          <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Setting />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </SideBar>
      <Apbar isOpen={isOpen} audioPlayer= {audioPlayer}/>
     <Audioplayer isOpen={isOpen} setIsOpen={setIsOpen} audioPlayer= {audioPlayer}/>
     </div>
    )}
    </Router>
    </div>
  );
}

export default App;
