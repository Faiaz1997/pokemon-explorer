import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FavoritesContext from '../context/FavoritesContext';
import '../styles.css';

const HomePage = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [sortOption, setSortOption] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust as needed

    const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
                const pokemonData = await Promise.all(
                    result.data.results.map(async (pokemon) => {
                        const pokemonDetail = await axios.get(pokemon.url);
                        return pokemonDetail.data;
                    })
                );
                setPokemonList(pokemonData);
            } catch (error) {
                console.error('Error fetching Pokémon data: ', error);
            }
        };
        fetchData();
    }, []);

    // **Filtering by search term**
    const filteredBySearch = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // **Filtering by type**
    const filteredByType = typeFilter
        ? filteredBySearch.filter((pokemon) =>
            pokemon.types.some((type) => type.type.name === typeFilter)
        )
        : filteredBySearch;

    // **Sorting logic (by name or base stats)**
    const sortedPokemon = [...filteredByType].sort((a, b) => {
        if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'base_stat') {
            const totalStatsA = a.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
            const totalStatsB = b.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
            return totalStatsB - totalStatsA;
        }
        return 0;
    });

    // **Pagination logic**
    const totalPages = Math.ceil(sortedPokemon.length / itemsPerPage);
    const paginatedPokemon = sortedPokemon.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="home-page">
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search Pokémon"
                className="search-bar"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Type Filter Dropdown */}
            <div className="filter">
            <select onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
            </select>

            {/* Sorting Dropdown */}
            <select onChange={(e) => setSortOption(e.target.value)}>
                <option value="name">Sort by Name</option>
                <option value="base_stat">Sort by Base Stats</option>
            </select>
            </div>
        
            {/* Pokémon Cards */}
            <div className="pokemon-card-container">
                {paginatedPokemon.map((pokemon) => {
                    const isFavorite = favorites.some((fav) => fav.name === pokemon.name);
                    return (
                        <div className="pokemon-card" key={pokemon.name}>
                            <h3>{pokemon.name}</h3>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <Link to={`/pokemon/${pokemon.name}`}>
                                <button className="view-details-button">View Details</button>
                            </Link>
                            <button
                                className="favorite-button"
                                onClick={() =>
                                    isFavorite ? removeFromFavorites(pokemon.name) : addToFavorites(pokemon)
                                }
                            >
                                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;
