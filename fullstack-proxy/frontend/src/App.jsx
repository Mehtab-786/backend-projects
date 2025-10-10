import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [JOKES, setJOKES] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
    .then((res) => {
      setJOKES(res.data.jokes)
    })
    .catch(err => console.log('error :: axios :: api calling ::' , err))
  },[])
  
  return (
    <div>
      <h3>Practicing proxy, cors and good practices while connecting backend with frontend </h3>
      {JOKES &&  JOKES.map(joke => (
          <p key={joke.content}>{joke.content}</p>
        ))
      }
    </div>
  )
}

export default App
