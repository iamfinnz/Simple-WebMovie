import { useEffect, useState } from 'react';
import './App.css';
import { getMovie, searchMovie } from './api';

const App = () => {

  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovie().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  // console.log({popularMovies: popularMovies})

  const ShowPopularMovie = () => {
    return popularMovies.map((movie, i) => {
      return(
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
          <div className="Movie-date">release: {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const cari = await searchMovie(q)
      // console.log({cari: cari})
      setPopularMovies(cari.results)
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ilham Movie</h1>
        <input
        className='Movie-search'
        placeholder='Cari film kesayangan kamu'
        onChange={({target}) => search(target.value)} />
        <div className="Movie-container">
          <ShowPopularMovie />
        </div>
      </header>
    </div>
  );
}

export default App;
