import '../css/PokemonCard.css'
import PokemonInf from '../components/PokemonInf'
import { useState } from 'react'


function PokemonCard({ pokemon, onSelectPokemon }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);


  const handleClick = (name) => {
    onSelectPokemon(name)
    setSearchTerm(name);

    showPopup?setShowPopup(false) : setShowPopup(true);
    
  }

  return (
    <li
      key={pokemon.name}
      className="cards"
      onClick={() => handleClick(pokemon.name)}
    >
      <div>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className=""
        />
      </div>
      <div>


        <h2 className="">{pokemon.name}</h2>


      </div>
      {/* <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p> */}
      {/* <p><strong>HP:</strong> {pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat}</p> */}
      {showPopup && (
        <div className="pokemon-inf-container">
          <PokemonInf
            nombre={searchTerm}
            onClick={() => setShowPopup(false)}
            funcion={() => setShowPopup()} />
        </div>)}
    </li>
  )
}

export default PokemonCard
