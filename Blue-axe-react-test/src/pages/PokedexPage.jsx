import { useState } from 'react'
import { usePokemonData } from '../hooks/usePokemonData'
import SearchBar from '../components/SearchBar'
import PokemonList from '../components/PokemonList'
import { fetchPokemonDetails } from '../services/pokeApi'
import '../css/PokedexPage.css'

function PokedexPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const {
    pokemons,
    allPokemonNames,
    nextUrl,
    prevUrl,
    setCurrentUrl
  } = usePokemonData()

  const handleSelectPokemon = async (name) => {
    try {
      const { data } = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${name}`)
      // Puedes hacer lo que quieras aquí, por ejemplo:
      console.log('Pokémon seleccionado:', data)
      // Mostrar modal, agregarlo a una lista, etc.
    } catch (err) {
      console.error('Error al cargar el Pokémon:', err)
    }
  }

  return (
    <div className="">
      <h1 className="">Pokédex</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        allPokemonNames={allPokemonNames}
        // onSelect={handleSelectPokemon} // Aquí se pasa
      />


      <section className="pokemon-list">

        <PokemonList pokemons={pokemons} />

      </section>

      <div className="navigation-buttons-container">
        <button onClick={() => prevUrl && setCurrentUrl(prevUrl)} disabled={!prevUrl}>
          Anterior
        </button>
        <button onClick={() => nextUrl && setCurrentUrl(nextUrl)} disabled={!nextUrl}>
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default PokedexPage
