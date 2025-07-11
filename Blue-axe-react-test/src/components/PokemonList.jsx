import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemons, onSelectPokemon }) {
  const handleClick = (name) => {
    // console.log('Pokémon seleccionado:', name)
    onSelectPokemon(name)
  }
  return (
    <ul className="cards-container">
      {pokemons.map(pokemon => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          // onSelectPokemon={()=> onSelectPokemon(pokemon.name)}
          onSelectPokemon={()=> handleClick(pokemon.name)}

        />
      ))}
    </ul>
  )
}


export default PokemonList
