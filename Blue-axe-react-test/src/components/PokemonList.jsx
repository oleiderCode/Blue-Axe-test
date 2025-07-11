import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemons }) {
  return (
    <ul className="cards-container">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </ul>
  )
}

export default PokemonList
