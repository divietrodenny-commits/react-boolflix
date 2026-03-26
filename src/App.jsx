import { useState } from 'react'
import './App.css'

function App() {

  const api_key = import.meta.env.VITE_API_KEY
  
  
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  
  function searchMovies() {
    const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=ritorno+al+futuro`

    fetch(api_url)
      .then(res => res.json())
      .then(data => {
        console.log([])
        setMovies(data)
      })
      .catch(err => console.error('Errore API:', err))
  }

  return (
    <>
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="cerca film"/>
        <button onClick={searchMovies}>Cerca</button>

      </div>
    </>
  )
}

export default App
