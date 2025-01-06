// src/pages/FavoritesPage.js
import React, { useContext } from 'react';
import FavoritesContext from '../context/FavoritesContext';
import PokemonCard from '../components/PokemonCard';

const FavoritesPage = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="home-page">
            <h1>Favorite Pokémon</h1>
            <div className="pokemon-card-container">
                {favorites.length > 0 ? (
                    favorites.map((pokemon, index) => (
                        <PokemonCard key={index} pokemon={pokemon} />
                    ))
                ) : (
                    <p>No favorite Pokémon yet!</p>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
