import { useState, useEffect } from 'react'
import chaki from './assets/images/chaki.jpeg'

const App = () => {

  const API_KEY = '54805bfa748c0f7abf2edfcca6b0aa53'
  const BASE_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`


  const [movieList, setMovieList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL);
      const dataJSON = await response.json();
      if (dataJSON) {
        setMovieList(dataJSON.results);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  console.log(movieList)

  async function handleSearchSubmit(e) {
    e.preventDefault()
    console.log('searchQuery: ', searchQuery)
    if (searchQuery.length > 0) {
      const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?query=${searchQuery.split(' ').join('+')}&api_key=${API_KEY}`
      const response = await fetch(SEARCH_API_URL)
      console.log("🚀 ~ handleSearchSubmit ~ SEARCH_API_URL:", SEARCH_API_URL)
      const dataJSON = await response.json()
      if (dataJSON) {
        setMovieList(dataJSON.results)
      }
    } else {
      fetchData()
    }
    setSearchQuery('')
  }


  return (
    <div className='app-wrapper'>
      <header>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className='search'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}

          />
        </form>
      </header>

      {
        movieList.length > 0 ? (
          <section className="movie-list">


            {
              movieList.map((movie) => (
                <div className='movie' key={movie.id}>
                  <img src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w1280/${movie.poster_path}` : chaki} alt="img" />
                  <div>
                    <h3 className='movie-name'>{movie.title}</h3>
                    <span className='movie-rating-count'>{movie.vote_average}</span>
                  </div>
                  <div className='overview'>
                    <h4>Overview</h4>
                    <p className="description">
                      {movie.overview}

                    </p>
                  </div>
                </div>
              ))
            }


          </section>
        ) : (
          <div className='not-found-movies'>
            Not found any movie
          </div>
        )
      }

    </div>
  )
}

export default App