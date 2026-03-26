import { useState } from 'react'
import './App.css'

function App() {

  const api_key = import.meta.env.VITE_API_KEY
  console.log(api_key);
  const api_url = `https://api.themoviedb.org/3/search/movie?api_key=d86f088fddafc60410d1e2d7615b7fe1&query=ritorno+al+fut
uro`
console.log(api_url);


  return (
    <>

    </>
  )
}

export default App
