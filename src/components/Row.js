import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import "./Row.css";
import MovieModal from './MovieModal';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({title, id, fetchUrl, isLargeRow}) {

  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(()=>{
    fetchMovieData();
  }, []);

  const fetchMovieData = async () =>{
    const request = await axios.get(fetchUrl);
    console.log('request', request);
    setMovies(request.data.results);
  };

  const handleClick = (movie) =>{
    setModalOpen(true);
    console.log("movie", movie);
    setMovieSelected(movie);
    console.log("movieSelected", movieSelected);
  };

  return (
    <section className='row'>
      {/* title */}
      <h1>{title}</h1>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1378:{
            slidesPerView:6,
            slidesPerGroup:6,
          },
          998:{
            slidesPerView:5,
            slidesPerGroup:5,
          },
          625:{
            slidesPerView:4,
            slidesPerGroup:4,
          },
          0:{
            slidesPerView:3,
            slidesPerGroup:3,
          }
        }}
      >
        <div id={id} className='row__posters'>
          {/* SEVERAL ROW__POSTER */}
          {movies.map((movie) =>(
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
                onClick={()=>handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>


      {/* Modal */}
      {
        modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
        )
      }
    </section>
  );
}

export default Row