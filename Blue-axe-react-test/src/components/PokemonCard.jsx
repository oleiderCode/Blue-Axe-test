import '../css/PokemonCard.css'

function PokemonCard({ pokemon }) {
  return (
    <li key={pokemon.name} className="cards">
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
    </li>
  )
}

export default PokemonCard
