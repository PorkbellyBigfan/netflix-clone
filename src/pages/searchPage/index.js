import React, { useEffect, useState } from 'react'
import axios from "../../api/axios"
import { useLocation, useNavigate } from 'react-router-dom';
import "./SearchPage.css"
import useDebounce from '../../hooks/useDebounce';

function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () =>{
    return new URLSearchParams(useLocation().search);
  };

  
  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(()=>{
    if(debouncedSearchTerm){
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) =>{
    try {
      const request = await axios.get(`/search/multi?query=${searchTerm}`)
      console.log("fetchSearchMovie : ",request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () =>{
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
            return(
              <div className='movie' key={movie.id}>
                <div className='movie__column-poster' onClick={()=>navigate(`/${movie.id}`)}>
                  <img 
                    src={movieImageUrl}
                    alt="movie"
                    className='movie__poster'
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className='no-result'>
        <div className='no-result__text'>
          <h2>The keyword "{debouncedSearchTerm}" that you are trying to find do not exist.</h2>
        </div>
      </section>
    );
  };
  return renderSearchResults();
}

export default SearchPage