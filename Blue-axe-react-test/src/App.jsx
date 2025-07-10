import {  useEffect, useState } from 'react'
import Axios from 'axios'

import './App.css'

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [prevUrl, setPrevUrl] = useState(null)
  const [currentUrl, setCurrentUrl] = useState(URL_BASE)
  const [detailedPokemons, setDetailedPokemons] = useState([])
  const [allPokemonNames, setAllPokemonNames] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const getAllPokemonNames = async () => {
      const res = await Axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=1300')
      setAllPokemonNames(res.data.results)
    }

    getAllPokemonNames()
  }, [])
  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await Axios.get(`${currentUrl}?offset=0&limit=6`)
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)

        const detailedData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const res = await Axios.get(pokemon.url)
            return res.data
          })
        )

        setDetailedPokemons(detailedData)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    getPokemons()
  }, [currentUrl])

  // Manejo de búsqueda
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase()
    setSearchTerm(input)

    const filtered = allPokemonNames.filter(p =>
      p.name.toLowerCase().includes(input)
    )

    // Limitar a 10 sugerencias
    setSuggestions(filtered.slice(0, 10)) 
  }

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar Pokémon..."
        className=""
      />

      <ul className="">
        {suggestions.map(p => (
          <li
            key={p.name}
            onClick={() => {
              setSearchTerm(p.name)
              setSuggestions([])
            }}
            className=""
          >
            {p.name}
          </li>
        ))}
      </ul>

      <div className="">
        <h1>Pokédex</h1>

        <ul className="">
          {detailedPokemons.map((pokemon) => (
            <li key={pokemon.name} className="">
              <h2 className="">{pokemon.name}</h2>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className=""
              />
              <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
              <p><strong>HP:</strong> {pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat}</p>
            </li>
          ))}
        </ul>


        <div className="">
          <button
            onClick={() => prevUrl && setCurrentUrl(prevUrl)}
            disabled={!prevUrl}
          >
            Anterior
          </button>

          <button
            onClick={() => nextUrl && setCurrentUrl(nextUrl)}
            disabled={!nextUrl}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  )
}


export default App
