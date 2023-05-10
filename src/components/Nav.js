import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Nav.css"
function Nav() {

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      if(window.scrollY>50){
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return()=>{
      window.removeEventListener("scroll", ()=>{});
    };
  }, []);

  const handleChange = (e) =>{
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`)
  };


  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img 
        alt='Netflix logo'
        src="https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png"
        className='nav__logo'
        onClick={()=> window.location.reload()}
      />

      {/* 검색바 */}
      <input 
        value={searchValue} 
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder='What you looking for?'
      />

      <img
        alt="User logged"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Netflix-new-icon.png/640px-Netflix-new-icon.png"
        className='nav__avatar'
      />
    </nav>
  )
}

export default Nav