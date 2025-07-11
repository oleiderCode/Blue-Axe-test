import { useEffect, useState } from 'react'
import { fetchAllPokemonInf } from '../services/pokeApi'
import '../css/PokemonInf.css'

export default function PokemonInf({ nombre = '', funcion }) {
    const [pokemon, setPokemon] = useState(null)
    const [error, setError] = useState(null)

    const getPokemonInf = async (nombre) => {
        try {
            const response = await fetchAllPokemonInf(nombre)
            setPokemon(response.data)
        } catch (err) {
            console.error('Error fetching Pokémon info:', err)
            setError('No se pudo obtener la información del Pokémon.')
        }
    }

    useEffect(() => {
        if (nombre) getPokemonInf(nombre)
    }, [nombre])


    if (error) return <div>{error}</div>
    if (!pokemon) return <div>Cargando información...</div>

    return (
        <div className="pokemon-inf">
            <div className="pokemon-inf__header">
                <span
                    onClick={() => funcion(false)}
                >X</span>

            </div>
            <div className="pokemon-inf__img">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <div className="pokemon-inf__name">
                <h3>
                    {pokemon.name}
                </h3>
            </div>
            <div className="pokemon-inf__types">
                <h3>Type:</h3>
                {pokemon.types.map((typeInfo) => (
                    <span key={typeInfo.type.name} className="pokemon-inf__type">
                        {typeInfo.type.name}
                    </span>
                ))}
                <div className="pokemon-inf__abilities">
                    <h3>Abilities:</h3>
                    <ul>
                        {pokemon.abilities.map((ability) => (
                            <li key={ability.ability.name}>
                                {ability.ability.name}
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="pokemon-inf__stats">
                    <h3>
                        height:
                    </h3>
                    <span>{pokemon.height * 0.1} m</span>
                    <h3>
                        weight:
                    </h3>
                    <span>{pokemon.weight * 0.1} kg</span>
                </div>
            </div>
        </div>
    )
}