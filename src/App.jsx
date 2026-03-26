import { useState } from 'react'
import './App.css'

function App() {

  const api_key = import.meta.env.VITE_API_KEY
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])

  function searchMovies() {
    const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}&language=it-IT`

    fetch(api_url)
      .then(res => res.json())
      .then(data => {
        console.log([])
        setMovies(data.results)
      })
      .catch(err => console.error('Errore API:', err))
  }

  return (
    <>
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca un film" />
        <button onClick={searchMovies}>Cerca</button>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.original_title}</p>
              <p>{movie.original_language}</p>
              <p>{movie.vote_average}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
