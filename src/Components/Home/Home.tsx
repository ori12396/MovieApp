import React, { useContext, useEffect, useState } from "react";
import { TMDB } from "../../APIService/TMDBService";
import MovieCard from "../MovieCard/MovieCard";
import './Home.css';
import Navbar from "../Navbar/Navbar";
import IMovieCardModel from "../../Interfaces/IMovieCardModel";
import { MovieCardModel } from "../../Models/MovieCardModel";
import Contact from "../Contact/Contact";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { MovieContext } from "../../Context/Moviescontext";

function Home(): JSX.Element {
  const [movies, setMovies] = useState<IMovieCardModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const {addTicket} = useContext(MovieContext)

  const fetchMovies = async (searchKey?: string, page?: number): Promise<void> => {
    try {
      setLoading(true);
      const response: any = await TMDB.getMovies(searchKey, page);
      if (response && response.results) {
        const transformedMovies: IMovieCardModel[] = toMoviesCardModel(response.results);
        if (page && page > 1) {
          // If it's a subsequent page, append the new movies to the existing list
          setMovies((prevMovies) => {
            const existingMovieIds = prevMovies.map((movie) => movie.id);
            const newMovies = transformedMovies.filter((movie) => !existingMovieIds.includes(movie.id));
            return [...prevMovies, ...newMovies];
          });
        } else {
          setMovies(transformedMovies);
        }
  
        transformedMovies.forEach((movie) => {
          const ticket = {
            id: movie.id,
            tickets: movie.tickets,
          };
          addTicket(ticket);
        });
      } else {
        console.error("Invalid response:", response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchMovies();
    

   
  }, []);

  const toMoviesCardModel = (results: any[]): IMovieCardModel[] => {
    return results.map((result) => {
      return new MovieCardModel(
        result.id,
        result.title,
        result.poster_path,
        result.overview,
        result.backdrop_path,
        result.release_date,
        result.adult
      );
    });
  };

  const renderMovies = (): JSX.Element[] =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  const handleLoadMore: React.MouseEventHandler<HTMLButtonElement> = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(undefined, nextPage);
  };

  return (
    <div>
      <header>
        <div className="header-content"></div>
        <Navbar fetchMovies={fetchMovies} />
      </header>
      <div className="container">
        <span className="cards">{renderMovies()}</span>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <span>
            {movies.length > 0 && (
              <button className="load-more-button" onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </span>
        )}
      </div>
      <Contact />
    </div>
  );
}

export default Home;
