import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles.css';

function PokemonDetailsPage() {
    const { name } = useParams(); // Get Pokémon name from URL
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();
            setPokemon(data);
        };
        fetchPokemonDetails();
    }, [name]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pokemon-details-page">
            <div className="pokemon-details-card">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                />
                <h2>{pokemon.name}</h2>
                <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>

                <div className="abilities">
                    <h5>Abilities</h5>
                    {pokemon.abilities.map((ability) => (
                        <p key={ability.ability.name} className="ability-item">{ability.ability.name}</p>
                    ))}
                </div>

                <div className="types">
                    <h5>Types</h5>
                    {pokemon.types.map((type) => (
                        <p key={type.type.name} className="type-item">{type.type.name}</p>
                    ))}
                </div>

                <div className="stats">
                    <h5>Base Stats</h5>
                    <ul>
                        {pokemon.stats.map((stat) => (
                            <li key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>

                <Link to="/">
                    <button className="view-back-button">Back to Home</button>
                </Link>
            </div>
        </div>
    );
}

export default PokemonDetailsPage;
