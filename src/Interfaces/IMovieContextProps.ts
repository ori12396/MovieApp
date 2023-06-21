import IMovieCardModel from "./IMovieCardModel";
import IPurchaseItem from "./IPurchaseItem";
import ITicketObjectModel from "./ITicketObjectModel";

export default interface IMovieContextProps {
  favoriteMovies: IMovieCardModel[];
  purchaseHistory: IPurchaseItem[];
  addToFavorites: (movie: IMovieCardModel) => void;
  removeFromFavorites: (movieId: number) => void;
  addToPurchaseHistory: (movie: IMovieCardModel ) => void;
  ticketList: ITicketObjectModel[];
  addTicket: (ticket: ITicketObjectModel) => void;
  currentTab: number;
  
}
