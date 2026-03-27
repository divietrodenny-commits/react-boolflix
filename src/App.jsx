import { useState } from 'react'
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'

library.add(faStar, farStar)

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

  /* Stelle voto */
  function getStars(vote) {
    return Math.ceil((vote || 0) * 5 / 10)
  }

  function renderStars(starsCount) {
    const totalStars = 5
    const stars = []

    for (let i = 0; i < totalStars; i++) {
      stars.push(
        i < starsCount ?
          <FontAwesomeIcon key={`full-${i}`} icon="fas fa-star" /> :
          <FontAwesomeIcon key={`empty-${i}`} icon="far fa-star" />
      )
    }
    return stars
  }

  /* Ricerca per film + serie tv */
  function searchMovies() {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(query)}&language=it-IT`
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${encodeURIComponent(query)}&language=it-IT`

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
    <div className="container-fluid py-4 bg-dark min-vh-100">
      {/* Header */}
      <header className="row mb-5 pb-4 border-bottom border-danger border-3">
        <div className="col-md-3">
          <h1 className="display-4 fw-bold text-danger mb-0">
            <i className="bi bi-play-circle-fill me-3"></i>
            BoolFlix
          </h1>
        </div>
        <div className="col-md-6">
          <div className="input-group input-group-lg">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cerca film o serie TV"
              className="form-control bg-dark text-white border-danger" />
            <button onClick={searchMovies} className="btn btn-danger btn-lg">
              <i className="bi bi-search"></i> Cerca
            </button>
          </div>
        </div>
      </header>

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

            {/* valutazione in stelle film*/}
            <div>{renderStars(getStars(movie.vote_average))}</div>
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

            {/* valutazione in stelle serie tv*/}
            <div>{renderStars(getStars(show.vote_average))}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App