// src/api.js
import axios from 'axios';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async () => {
    const response = await axios.get(`${API_BASE_URL}/pokemon?limit=50`);
    return response.data.results;
};

export const getPokemonDetails = async (name) => {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
    return response.data;
};
