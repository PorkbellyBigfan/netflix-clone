import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import requests from '../api/requests';
import "./Banner.css";
import styled from 'styled-components';

function Banner() {
  const [isClicked, setIsClicked] = useState(false);
  // Description 글자수가 너무 길때
  const truncate = (str, n) =>{
    return str?.length > n ? str.substr(0, n- 1) + "..." : str;
  }

  //Movie Data Fetching
  const [movie, setMovie] = useState([]);
  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () =>{
    // 현재 상영중인 영화 정보를 가져오기
    const request = await axios.get(requests.fetchNowPlaying);
    // 가져온 영화 정보에서 하나의 ID fetching
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;
    console.log(request);
    console.log(movieId);
    // 가져온 영화 정보의 ID로 상세 정보 가져오기
    const {data : movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos"},
    });
    setMovie(movieDetail);
    console.log(movieDetail)
  }


  if(!isClicked){
    return (
      <header
        className='banner'
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className='banner__contents'>
          {/* title */}
          <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
          
          {/* Play and more info buttons */}
          <div className='banner__buttons'>
            <button className='banner__button play' onClick={()=> setIsClicked(true)}>Play</button>
            <button className='banner__button info'>
              <div className='space'></div> More Information
            </button>
          </div>
  
          {/* Description */}
          <h1 className='banner__description'>{truncate(movie?.overview, 100)}</h1>
        </div>
        <div className='banner__fadeBottom' />
      </header>
    )
  } else {
    return(
      <Container>
        <HomeContainer>
        <Iframe 
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autopaly=1&loop=1&playlist=${movie.videos.results[0].key}`} 
          width="640" 
          height="360" 
          frameborder="0" 
          allow="autoplay; fullscreen"
        />
        </HomeContainer>
      </Container>
    )
  }  
}

  // Styled Components
  // ====================================================
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:100%;
    height:100vh;
  `
  const HomeContainer = styled.div`
    width:100%;
    height:100%;
  `
  //Iframe
  const Iframe = styled.iframe`
    width:100%;
    height:100%;
    z-index: -1;
    opacity: 0.65;
    border: none;

    &::after{
      content:"";
      position: absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
    }
  `
  // ====================================================



export default Banner