import { TMDB } from "../../APIService/TMDBService";
import { useHref, useLocation, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../Context/Moviescontext";
import ITrailer from "../../Interfaces/ITrailer";
import './Purchase.css';
import Navbar from "../Navbar/Navbar";
import Ticket from "../../Icons/ticket-perforated.svg"
import IMovieCardModel from "../../Interfaces/IMovieCardModel";
import ITicketObjectModel from "../../Interfaces/ITicketObjectModel";


export default function Purchase(): JSX.Element {
  const location = useLocation();
  const [trailer, setTrailer] = useState<ITrailer>();
  const [showTrailer, setShowTrailer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const { movie } = location.state as { movie: IMovieCardModel };
  const { addToPurchaseHistory, ticketList } = useContext(MovieContext);
  const movieContext = useContext(MovieContext);
  const [purchased, setPurchased] = useState(false);
  const navigate = useNavigate();
  const ticketModel = ticketList.find((ticket) => ticket.id === movie.id);
  const handleBuyNow = () => {
    movieContext.currentTab = 1
    if (ticketModel) {
      const updatedTickets = ticketModel.tickets - 1;


      const updatedTicketList = ticketList.map((ticket) => {
        if (ticket.id === movie.id) {
          ticket.tickets = updatedTickets;
        }

      });

      addToPurchaseHistory(movie);
      setPurchased(true);
    }
  };




  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (purchased) {
      timer = setTimeout(() => {
        setPurchased(false);
        redirectToHome();
      }, 10000);
    }

    const redirectToHome = () => {
      navigate("/");
    };

    return () => clearTimeout(timer);
  }, [purchased]);

  const IMAGE_PATH: string = "https://image.tmdb.org/t/p/original";

  const fetchVideos = async (movieId: number): Promise<ITrailer | undefined> => {
    try {
      const videos = await TMDB.getVideos(movieId);
      const officialTrailer = videos.results.find((video: ITrailer) =>
        video.name && video.name.includes("Official Trailer")
      );
      return officialTrailer || undefined;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadVideos = async () => {
      const videos: ITrailer | undefined = await fetchVideos(movie.id);
      setTrailer(videos);
    };

    loadVideos();
  }, []);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    if (!showDetails) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      setTimeout(() => {
        setShowOverview(true);
      }, 300); 
    } else {
      setShowOverview(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const redircet=()=>{
    movieContext.currentTab = 1
    navigate('/')
  }
  return (
    <div>
      {!purchased && (
        <div>
          <Navbar fetchMovies={undefined} />

          <div className="hero" style={{ backgroundImage: `url('${IMAGE_PATH}${movie.back_img}')` }}>
            <div className="hero-content max-center">
              {trailer ? (
                !showTrailer && (
                  <button className="button" onClick={() => setShowTrailer(true)}>
                    Play Trailer
                  </button>
                )
              ) : null}
              <h1 className="hero-title">{movie.title}</h1>
              {movie.overview ? <p>{movie.overview}</p> : null}
              {showTrailer && trailer ? (
                <div className="trailer-container">
                  <YouTube videoId={trailer.key} className="trailer-video" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="rest-of-the-page">
            {movie.adult ? (
              <div className="icon-18plus"></div>
            ) : (
              <div className="young"></div>
            )}
            <div className="parent">
              <div className={`${ticketModel && ticketModel.tickets <= 0 ? 'child-no-tickets' : 'child'}`}>
                {ticketModel && ticketModel.tickets <= 0 ? (
                  <p>No tickets left!</p>
                ) : (
                  <>
                    <p className="tickets-left">
                      <img src={Ticket} alt="bi bi-ticket-perforated" /> {ticketModel?.tickets} tickets left
                    </p>
                  </>
                )}
              </div>


              {ticketModel && ticketModel.tickets > 0 && (
                <div className="child-buy-now">
                  <button className="buy-now-button" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                </div>
              )}
              <div className="child date ">
                <p className="date">Releae date: {movie.date}</p>
              </div>
            </div>

            <div className="overview">
              <div className="tocenter">
                <button className={`expand-button ${showDetails ? "collapsed" : ""}`} onClick={toggleDetails}>
                  <span className="arrow"></span>
                </button>
              </div>

              {showOverview && showDetails && (
                <span className="overview ">
                  <span>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {purchased && (
        <div className="tocetner">
          <h2>Thank you for ordering from us!</h2>
          <p className="cursor" onClick={redircet}>Redirecting to home soon, if not please press here </p>
        </div>
      )}
    </div>
  );

}
