// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import HomePage from './pages/HomePage';
import PokemonDetailsPage from './pages/PokemonDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <FavoritesProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
            </Router>
        </FavoritesProvider>
    );
};

export default App;
