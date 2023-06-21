import React, { useContext, useState } from "react";
import "./MovieCard.css";
import Modal from "react-modal";
import HeartIcon from "../../Icons/heart.svg";
import HeartFillIcon from "../../Icons/heart-fill.svg";
import Bag from '../../Icons/bag.svg'
import IMovieCardProps from "../../Interfaces/IMovieCardProps";
import { Link, useNavigate } from "react-router-dom";

import { MovieContext } from "../../Context/Moviescontext";
Modal.setAppElement("#root"); // require for no warning while using modal 
export default function MovieCard(props: IMovieCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const IMAGE_PATH: string = "https://image.tmdb.org/t/p/w500";
  const { movie } = props;
  const navigate = useNavigate();

  var { currentTab } = useContext(MovieContext);
  const movieContext = useContext(MovieContext);
  const { favoriteMovies, addToFavorites, removeFromFavorites } = useContext(
    MovieContext
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(
    favoriteMovies.some((favMovie) => favMovie.id === movie.id)
  );

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(true);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(false);
  };

  const handleModalOpen: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setIsModalOpen(true);
  };

  const handleModalClose: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsModalOpen(false);
  };

  const handleFavoriteToggle: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
    setIsFavorite(!isFavorite);
    console.log(favoriteMovies);
  };
  
  const handleNavigate = () => {
    movieContext.currentTab=3
    navigate("/purchase", { state: { movie } });
    
  };
  


  const truncateOverview = (overview: string, maxLength: number): string => {
    if (overview.length <= maxLength) {
      return overview;
    } else {
      const truncated = overview.substring(0, maxLength).trim();
      return truncated + "...";
    }
  };

  return (
    <div
      className="Movie-Card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`image-container ${isHovered ? "hovered" : ""}`}>
        {movie.poster && (
           <a onClick={handleNavigate} >
          <img
            className="movie-cover"
            src={`${IMAGE_PATH}${movie.poster}`}
            alt=""
          />
          </a>
        )}
        <div className="overlay">
          <div className="buttons">

            <button className="buy-button"  onClick={handleNavigate} >
              <img src={Bag} alt="bi bi bag" />
              Buy ticket
            </button>
            <button className="favorite-button" onClick={handleFavoriteToggle}>
              {isFavorite ? (
                <img src={HeartFillIcon} alt="Heart Fill" />
              ) : (
                <img src={HeartIcon} alt="Heart" />
              )}
            </button>
          </div>
          <div className="overview-link">
            <a
              href="#"
              className="overview-link"
              onClick={handleModalOpen}
            ><h3 className="tocenter">Overview:</h3>
              {truncateOverview(movie.overview, 80)}
            </a>
          </div>
        </div>
      </div>
      <h5 className="movie-title">{movie.title}</h5>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          contentLabel="Modal"
          style={{
            content: {
              width: "350px",
              height: "350px",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <button onClick={handleModalClose}>Close</button>
        </Modal>
      )}
    </div>
  );
}
