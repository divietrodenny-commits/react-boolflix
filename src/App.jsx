import { useState } from 'react'
import './App.css'

function App() {

  const api_key = import.meta.env.VITE_API_KEY
  console.log(api_key);
  const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}=ritorno+al+fut
uro`
console.log(api_url);


  return (
    <>

    </>
  )
}

export default App
