import { useEffect, useState } from 'react'
import { fetchPokemonList, fetchPokemonDetails, fetchAllPokemonNames } from '../services/pokeApi'

export function usePokemonData() {
const API_BASE = 'https://pokeapi.co/api/v2'
  const [pokemons, setPokemons] = useState([])
  const [detailedPokemons, setDetailedPokemons] = useState([])
  const [allPokemonNames, setAllPokemonNames] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
  const [prevUrl, setPrevUrl] = useState(null)
  const [currentUrl, setCurrentUrl] = useState(`${API_BASE}/pokemon?offset=0&limit=6`)


  useEffect(() => {
    fetchAllPokemonNames().then(res => {
      setAllPokemonNames(res.data.results)
    })
  }, [])

useEffect(() => {
  const getDetailedData = async () => {
    try {
      const res = await fetchPokemonList(currentUrl)
      const results = res.data?.results

      if (!Array.isArray(results)) {
        console.error('No results found:', res.data)
        return
      }

      setNextUrl(res.data.next)
      setPrevUrl(res.data.previous)

      const detailed = await Promise.all(
        results.map(p => fetchPokemonDetails(p.url).then(r => r.data))
      )

      setDetailedPokemons(detailed)
    } catch (error) {
      console.error('Error fetching pokemons:', error)
    }
  }

  getDetailedData()
}, [currentUrl])


  return {
    pokemons: detailedPokemons,
    allPokemonNames,
    nextUrl,
    prevUrl,
    setCurrentUrl
  }
}
