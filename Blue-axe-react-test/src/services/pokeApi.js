import Axios from 'axios'

const API_BASE = 'https://pokeapi.co/api/v2'

export const fetchPokemonList = (url = `${API_BASE}/pokemon?offset=0&limit=6`) => {
  return Axios.get(url)
}

export const fetchPokemonDetails = (url) => {
  return Axios.get(url)
}

export const fetchAllPokemonNames = () => {
  return Axios.get(`${API_BASE}/pokemon-species?limit=1300`)
}

export const fetchAllPokemonInf = (name) => {
  return Axios.get(`${API_BASE}/pokemon/${name}`)
}
