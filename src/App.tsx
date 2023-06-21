import React from 'react';
import Home from './Components/Home/Home';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Purchase from './Components/Purchase/Purchase';
import { MovieProvider } from './Context/Moviescontext';
import UserInfo from  './Components/UserInfo/UserInfo'

function App() {
  return (
    <BrowserRouter>
    <MovieProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
    </MovieProvider>
  </BrowserRouter>
  );
}

export default App;
