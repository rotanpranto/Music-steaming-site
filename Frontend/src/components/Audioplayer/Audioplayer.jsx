import React, { useState, useRef, useEffect } from 'react'
import { Col,Container,Row} from 'react-bootstrap'
import {FaBackward, FaForward} from 'react-icons/fa'
import {AiFillPlayCircle,AiFillPauseCircle} from 'react-icons/ai'
import {BsRepeat, BsRepeat1, BsShuffle} from 'react-icons/bs'
import {ImVolumeHigh, ImVolumeLow, ImVolumeMedium, ImVolumeMute} from 'react-icons/im'
import {SlScreenDesktop} from 'react-icons/sl'
import './Audioplayer.css'
import { useAudioContext } from '../../hooks/useAudioContext'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Audioplayer({ isOpen, setIsOpen, audioPlayer }) {

  const {song, dispatch} = useAudioContext();
  
    // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOnRepeat, setIsOnRepeat] = useState(false);
  const [isOnShuffle, setIsOnShuffle] = useState(false);
  // const [OgSongList, setOgSongList] = useState([])
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.25);

  // references
  const progressBar = useRef();   // reference our progress bar
  const volumeBar = useRef();   // reference our volume bar
  const animationRef = useRef();  // reference the animation
  const audioElementRef = useRef();
  const changeVolume = () => {
    setVolume(volumeBar.current.value/100);
    const vol = volumeBar.current.value/100
    console.log(vol)
    if(vol < 0.01){
      audioElementRef.current.volume = vol
    }
    else{
    audioElementRef.current.volume = vol - 0.01
    }
  }

  const toggleOnRepeat = () => {
    const prevValue = isOnRepeat;
    setIsOnRepeat(!prevValue);
  }

  // const toggleOnShuffle = () => {
    

  //   if(isOnShuffle){
  //     song = OgSongList
  //   }
  //   else{
  //     let currentIndex = song.length,  randomIndex;
  //     setOgSongList(song)
  //     let randomSong = song
  //     // While there remain elements to shuffle.
  //     while (currentIndex != 0) {

  //     // Pick a remaining element.
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;
  
  //     // And swap it with the current element.
  //     [randomSong[currentIndex], randomSong[randomIndex]] = [
  //       randomSong[randomIndex], randomSong[currentIndex]];
  //     }

  //     song = randomSong;

  //   }
  // }

  useEffect(() => {
    const seconds = Math.floor(audioElementRef.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioElementRef?.current?.loadedmetadata, audioElementRef?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  useEffect(() => {
    if(song && song.length === 1){
      setIsPlaying(true)
      audioElementRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }, [song]);

  useEffect(() => {
    if(song && song.length >= 1){
      setIsPlaying(true)
      audioElementRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }, [songIndex]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioElementRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioElementRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioElementRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioElementRef.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backTen = () => {
    progressBar.current.value = Number(progressBar.current.value) - 10;
    changeRange();
  }

  const forwardTen = () => {
    progressBar.current.value = Number(progressBar.current.value) + 10;
    changeRange();
  }

  const handleNextSong = ()=>{
    if (songIndex >= song.length - 1) {
      let setNumber = 0;
      setSongIndex(setNumber);
    }else{
      let setNumber = songIndex + 1;
      setSongIndex(setNumber)
    }
  }

  const handlePrevSong = ()=>{
    if (songIndex === 0) {
      let setNumber = song.length - 1;
      setSongIndex(setNumber);
    }else{
      let setNumber = songIndex - 1;
      setSongIndex(setNumber)
    }
  }

useEffect(() => {
  {song && song[songIndex].trackId &&
    // Make an API call to increment the trending count
    axios.patch(`http://127.0.0.1:4000/api/tracks/trend/${song[songIndex].trackId}`)
    .then((response) => {
      console.log(response.data); // "Trending incremented"
    })
    .catch((error) => {
      console.error(error);
    });
  }
}, [songIndex]);

  

  audioPlayer.current = audioElementRef.current;
  return (
    <div className='playerBody'>
        <audio ref={audioElementRef} loop={isOnRepeat} volume={volume} src={song? song[songIndex].song: null} onEnded={handleNextSong} ></audio>
        {/* 'https://firebasestorage.googleapis.com/v0/b/mp3url.appspot.com/o/Mp3ZZ%2F1%20-%20Steal%20Something.mp3?alt=media&token=f64e5ce9-96c9-4f41-b0a0-780c6163705d' */}
        <div className='wrapper'>
          <div className='colright'>
            {song?
            <div>
              <img src={song? song[songIndex].albumImg: null}/>
              <div className='textbox'>
                <p>{song? song[songIndex].name: null}</p>
                <Link to={`album/${song[songIndex].album_id}`}>
                  <p>{song? song[songIndex].album: null}</p>
                </Link>
              </div>
            </div>
            : null
            }
          </div>
          <div className='colcenter'>
              <div className='therows'>
                  <div className='button'>{calculateTime(currentTime)}</div>
                  <input type='range' defaultValue="0" ref={progressBar} onChange={changeRange} />
                  <div className='button'>{!isNaN(duration)?((duration && !isNaN(duration)) && calculateTime(duration)):"00:00"}</div>
              </div>
              <div className='therows'>
                  {
                    isOnRepeat?<BsRepeat1 className={"button"} onClick={toggleOnRepeat}/>:<BsRepeat className={"button"} onClick={toggleOnRepeat}/>
                  }
                  
                  <BiSkipPrevious size={30} className={song?song.length>1?'button':'disable':'disable'} onClick={handleNextSong}/>
                  <FaBackward className={song?'button':'disable'} onClick={backTen}/>
                  <div onClick={togglePlayPause}>{isPlaying? <AiFillPauseCircle size={40} className={song?'button':'disable'}/>:<AiFillPlayCircle size={40} className={song?'button':'disable'}/>}</div>
                  <FaForward className={song?'button':'disable'} onClick={forwardTen}/>
                  <BiSkipNext size={30} className={song?song.length>1?'button':'disable':'disable'} onClick={handlePrevSong}/>
                  <BsShuffle className={isOnShuffle?"button":"unselectedButto"} onClick={() => setIsOnShuffle(!isOnShuffle)}/>
              </div>
          </div>
          <div className='colleft'>
              <div className='therows'>
                  <SlScreenDesktop className="button" onClick={() => setIsOpen(!isOpen)}/>
                  {volume>=0.66?<ImVolumeHigh className='button'/>:volume>=0.33?<ImVolumeMedium className='button'/>:volume>=0.01?<ImVolumeLow className='button'/>:<ImVolumeMute className='button'/>}
                  <input type='range' defaultValue={volume*100} ref={volumeBar} onChange={changeVolume}/>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Audioplayer