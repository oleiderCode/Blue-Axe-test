import { useState, useEffect, useRef } from "react"
import "../css/SearchBar.css"

function SearchBar({
  searchTerm,
  setSearchTerm,
  suggestions,
  setSuggestions,
  allPokemonNames,
  onSelect,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const containerRef = useRef(null)

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase()
    setSearchTerm(input)

    const filtered = allPokemonNames.filter(p =>
      p.name.toLowerCase().includes(input)
    )

    setSuggestions(filtered.slice(0, 10))
    // abre lista al escribir
    setIsSearchFocused(true) 
  }

  // Cerrar el dropdown si el usuario clickea afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSearchFocused(false)
        setSuggestions([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef}>
      <div className="search-bar">
        <svg
          className=""
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1 0 4.5 4.5a7.5 7.5 0 0 0 12.15 12.15z"
          />
        </svg>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar Pokémon..."
          className=""
          onFocus={() => setIsSearchFocused(true)}
        />
      </div>

      <ul className={`suggestions-list ${isSearchFocused && suggestions.length > 0 ? "show" : "hidde"}`}>
         {suggestions.map(p => (
          <li
            key={p.name}
            onClick={() => {
              setSearchTerm(p.name)
              setSuggestions([])
              onSelect?.(p.name)
            }}
            className=""
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar
