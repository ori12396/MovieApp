import React, { createContext, useState, ReactNode } from 'react';
import IMovieCardModel from '../Interfaces/IMovieCardModel';
import IMovieContextProps from '../Interfaces/IMovieContextProps';
import ITicketObjectModel from '../Interfaces/ITicketObjectModel';
import IPurchaseItem from '../Interfaces/IPurchaseItem';

export const MovieContext = createContext<IMovieContextProps>({
  favoriteMovies: [],
  purchaseHistory: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  addToPurchaseHistory: () => {},
  ticketList: [],
  addTicket: () => {},
  currentTab: 1,
});

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const favoriteMovies: IMovieCardModel[] = [];
  const purchaseHistory: IPurchaseItem [] = [];
  const ticketList: ITicketObjectModel[] = [];
  var currentTab:number= 1;

  const addToFavorites = (movie: IMovieCardModel) => {
    favoriteMovies.push(movie);
  };

  const removeFromFavorites = (movieId: number) => {
    const index = favoriteMovies.findIndex((movie) => movie.id === movieId);
    if (index !== -1) {
      favoriteMovies.splice(index, 1);
    }
  };

  const addToPurchaseHistory = (movie: IMovieCardModel) => {
    const purchaseTime = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    const formattedTime = formatter.format(purchaseTime);
    const purchaseItem: IPurchaseItem = { movie, time: formattedTime };
    purchaseHistory.push(purchaseItem);
  };
  
  
  

  const addTicket = (ticket: ITicketObjectModel) => {
    const existingTicket = ticketList.find((t) => t.id === ticket.id);
    if (!existingTicket) {
      ticketList.push(ticket);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        favoriteMovies,
        purchaseHistory,
        addToFavorites,
        removeFromFavorites,
        addToPurchaseHistory,
        ticketList,
        addTicket,
        currentTab,
       
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
