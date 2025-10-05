import {useState } from 'react'
import FaceEmotion from './components/FaceEmotion'
import SongList from './components/SongList'

function App() {
  const [song, setsong] = useState([])

  return (
    <div className='bg-black text-gray-100  flex-col justify-center items-start min-h-screen p-8'>
    <FaceEmotion setsong={setsong}  />
    <SongList song={song} />
    </div>
  )
}

export default App