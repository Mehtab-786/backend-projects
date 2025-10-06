import React, { useState } from 'react'

function App() {
  const [caption, setCaption] = useState(null)
  return (
    <div className='w-full h-screen bg-neutral-800 text-white flex items-center justify-center'>
      <div>
        <input type='image' alt="Submit feedback" />
      </div>
      <p>{caption}</p>
    </div>
  )
}

export default App