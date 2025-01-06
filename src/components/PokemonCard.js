// src/components/PokemonCard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoritesContext from '../context/FavoritesContext';

const PokemonCard = ({ pokemon }) => {
    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

    const isFavorite = favorites.some((fav) => fav.name === pokemon.name);

    return (
        <div className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <Link to={`/pokemon/${pokemon.name}`}>
                <button className="view-details-button">View Details</button>
            </Link>
            <button 
                className="favorite-button" 
                onClick={() => isFavorite ? removeFromFavorites(pokemon.name) : addToFavorites(pokemon)}
            >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default PokemonCard;
