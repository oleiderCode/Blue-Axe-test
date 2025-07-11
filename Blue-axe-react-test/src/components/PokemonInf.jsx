import { useEffect, useState } from 'react'
import { fetchAllPokemonInf } from '../services/pokeApi'

export default function PokemonInf({ nombre = '' }) {
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
            <div className="pokemon-inf__img">
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <div className="pokemon-inf__name">{pokemon.name}</div>
            <div className="pokemon-inf__types">
                {pokemon.types.map((typeInfo) => (
                    <span key={typeInfo.type.name} className="pokemon-inf__type">
                        {typeInfo.type.name}
                    </span>
                ))}
            </div>
        </div>
    )
}