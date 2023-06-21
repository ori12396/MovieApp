import { useContext, useState } from 'react';
import './UserInfo.css';
import { MovieContext } from '../../Context/Moviescontext';
import Navbar from '../Navbar/Navbar';
import MovieCard from '../MovieCard/MovieCard';
import Contact from '../Contact/Contact';
import Receipt from '../../Icons/receipt.svg';
import Star from '../../Icons/star.svg';

function UserInfo(): JSX.Element {
    const { favoriteMovies, purchaseHistory } = useContext(MovieContext);
    const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
    const [showFavoriteList, setShowFavoriteList] = useState(false);
    const [moveButtonHistory, setMoveButtonHistory] = useState(false);
    const [moveButtonFavorite, setMoveButtonFavorite] = useState(false);
  
    const togglePurchaseHistory = () => {
      setTimeout(() => {
        setShowPurchaseHistory((prev) => !prev);
      }, 300);
      setMoveButtonHistory((prev) => !prev);
    };
  
    const toggleFavoriteList = () => {
      setTimeout(() => {
        setShowFavoriteList((prev) => !prev);
      }, 300);
      setMoveButtonFavorite((prev) => !prev);
    };
  
    return (
      <div className="user-info-container">
        <header>
          <Navbar fetchMovies={undefined} />
        </header>
        <div className="user-info-content">
          <div className="left-section">
            <h2><img  src={Star} alt="bi bi-star" /> Favorite Movies:</h2>
            <button
              className={`expand-button ${moveButtonFavorite ? 'collapsed' : ''}`}
              onClick={toggleFavoriteList}
            >
              <span className={`arrow ${moveButtonFavorite ? 'collapsed' : ''}`}></span>
            </button>
  
            {showFavoriteList && (
              <div className="movie-list">
                {favoriteMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
  
          <div className="right-section">
            
            <h2><img  src={Receipt} alt="bi bi-receipt" /> Purchase History:</h2>
            <button
              className={`expand-button ${moveButtonHistory ? 'collapsed' : ''}`}
              onClick={togglePurchaseHistory}
            >
              <span className={`arrow ${moveButtonHistory ? 'collapsed' : ''}`}></span>
            </button>
  
            {showPurchaseHistory && (
              <ul>
                {purchaseHistory.map((PurchaseItem) => (
                  <li key={`purchase-${PurchaseItem.movie.id}`}>
                    You have purchased a ticket to "{PurchaseItem.movie.title}", on {PurchaseItem.time}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Contact />
      </div>
    );
  }
  

export default UserInfo;
