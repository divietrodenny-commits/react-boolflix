import { useState } from 'react'
import './App.css'
function App() {
  const api_key = import.meta.env.VITE_API_KEY
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [tvShows, setTvShows] = useState([])

  function getFlag(language) {
    const flags = {
      it: '🇮🇹',
      en: '🇺🇸',
      fr: '🇫🇷'
    }
    return flags[language] || 'Lingua non trovata'
  }

  function searchMovies() {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}&language=it-IT`
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${encodeURIComponent(query)}&language=it-IT`

    fetch(movieUrl)
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
      .catch(err => console.error(err))

    fetch(tvUrl)
      .then(res => res.json())
      .then(data => {
        const Tv = data.results?.map(show => ({
          id: show.id,
          title: show.name,
          original_title: show.original_name,
          original_language: show.original_language,
          vote_average: show.vote_average
        })) || []
        setTvShows(Tv)
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Cerca film o serie TV"
      />
      <button onClick={searchMovies}>Cerca</button>

      <h3>Film</h3>
      <ul>
        {movies.slice(0, 5).map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.original_title}</p>
            <p>{getFlag(movie.original_language)} {movie.original_language}</p>
            <p>{movie.vote_average}</p>
          </li>
        ))}
      </ul>

      <h3>Serie TV</h3>
      <ul>
        {tvShows.slice(0, 5).map(show => (
          <li key={show.id}>
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