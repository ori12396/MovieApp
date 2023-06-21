import React, { useState, useEffect, ChangeEvent, FormEvent, useRef, useContext } from 'react';
import './Navbar.css';
import INavbarProps from '../../Interfaces/INavbarProps';
import Film from '../../Icons/film.svg';
import { useNavigate, Link } from 'react-router-dom';
import { MovieContext } from '../../Context/Moviescontext';

function Navbar({ fetchMovies }: INavbarProps): JSX.Element {
  const [searchKey, setSearchKey] = useState<string>('');
  const logoRef = useRef<HTMLHeadingElement>(null);
  var { currentTab } = useContext(MovieContext);
  const movieContext = useContext(MovieContext);
  const navigate = useNavigate();

  const searchMovies = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (fetchMovies) {
      fetchMovies(searchKey);
    }
  };

  const shouldRenderSearch = fetchMovies !== undefined;

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    const handleScroll = (): void => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = prevScrollPos < currentScrollPos;

      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (isScrollingDown) {
          navbar.classList.add('hidden');
        } else {
          navbar.classList.remove('hidden');
        }
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.click();
    }
  }, []);


  const navigateToTab = (tab: number): void => {
    movieContext.currentTab = tab
    switch (tab) {

      case 1:
        navigate('/');
        break;
      case 2:

        navigate('/userinfo');
        break;
      default:
        break;
    }
  };

  return (
    <header id="navbar" className="navbar">
      <h1 className='logo' onClick={scrollToTop} ref={logoRef}>
        <img src={Film} alt="bi bi-film" />
        <span className="app-text">Movie App</span>
      </h1>

      <div className="tabs-container">
        <span className={`menu-tab ${currentTab === 1 ? 'active-tab' : ''}`} onClick={() => navigateToTab(1)}>
          <h2 className='info'>Home</h2>
        </span>
        <span className="tab-separator"></span>
        <span className={`menu-tab ${currentTab === 2 ? 'active-tab' : ''}`} onClick={() => navigateToTab(2)}>
          <h2>User Info</h2>
        </span>
        <span className="tab-separator"></span>
        <span className={`semi-menu-tab ${currentTab === 3 ? 'active-tab' : ''}`}>
          <h2>Purchase</h2>
        </span>
      </div>



      {shouldRenderSearch && (
        <form onSubmit={searchMovies}>
          <input
            className='search-box'
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKey(e.target.value)}
            placeholder='Search a movie'
          />
          <button className='search-button' type='submit'>Search</button>
        </form>
      )}
    </header>
  );
}


export default Navbar;
