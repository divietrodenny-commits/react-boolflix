import { useState } from 'react'
import './App.css'

function App() {

  /* Configurazione api e img */
  const api_key = import.meta.env.VITE_API_KEY
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
  const POSTER_SIZE = 'w342'

  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [tvShows, setTvShows] = useState([])

  /* flag per lingue */
  function getFlag(language) {
    const flags = { it: '🇮🇹', en: '🇺🇸', fr: '🇫🇷' }

    return flags[language] || 'Lingua non trovata'
  }
  /* poster */
  function getPosterUrl(poster_path) {
    return poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}` : ''
  }

  /* Ricerca per film + serie tv */
  function searchMovies() {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}&language=it-IT`
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${encodeURIComponent(query)}&language=it-IT`

    /* Estrapolo film e serie tv */
    fetch(movieUrl).then(res => res.json()).then(data => setMovies(data.results || []))

    fetch(tvUrl).then(res => res.json()).then(data => {
      const tv = data.results?.map(show => ({
        id: show.id,
        title: show.name,
        original_title: show.original_name,
        original_language: show.original_language,
        vote_average: show.vote_average,
        poster_path: show.poster_path
      })) || []
      setTvShows(tv)
    })
  }

  return (
    <div>
      {/* input + bottone */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Cerca film o serie TV" />
      <button onClick={searchMovies}>Cerca</button>

      {/* sezione film */}
      <h3>Film</h3>
      <ul>
        {movies.slice(0, 5).map(movie => (
          <li key={movie.id}>
            {movie.poster_path && (
              <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
            )}
            <h3>{movie.title}</h3>
            <p>{movie.original_title}</p>
            <p>{getFlag(movie.original_language)} {movie.original_language}</p>
            <p>{movie.vote_average}</p>
          </li>
        ))}
      </ul>
      {/* sezione serie tv */}
      <h3>Serie TV</h3>
      <ul>
        {tvShows.slice(0, 5).map(show => (
          <li key={show.id}>
            {show.poster_path && (
              <img src={getPosterUrl(show.poster_path)} alt={show.title} />
            )}
            <h3>{show.title}</h3>
            <p>{show.original_title}</p>
            <p>{getFlag(show.original_language)} {show.original_language}</p>
            <p>{show.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App