import { useState, useEffect, useRef } from "react";
import PokemonInf from "./PokemonInf";
import "../css/SearchBar.css";

function SearchBar({ searchTerm, setSearchTerm, suggestions, setSuggestions, allPokemonNames, onSelect }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const containerRef = useRef(null);

  const validNames = allPokemonNames.map(p => p.name.toLowerCase());

  const handleSearchChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);

    if (input.trim() === "") {
      setSuggestions([]);
      setIsSearchFocused(false);
      setShowPopup(false);  // 🛠 Ocultar popup al borrar
      return;
    }

    const filtered = allPokemonNames.filter(p =>
      p.name.toLowerCase().includes(input)
    );

    setSuggestions(filtered.slice(0, 10));
    setIsSearchFocused(true);

    // Si está escribiendo y no ha seleccionado aún, ocultar popup
    setShowPopup(false);
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsSearchFocused(false);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
    setIsSearchFocused(false);
    setShowPopup(true);
    onSelect?.(name);
  };

  const handleSearchClick = () => {
    // 🛑 Validar si el nombre existe
    const isValidName = validNames.includes(searchTerm.toLowerCase());
    if (!isValidName) {
      alert("Pokémon no encontrado.");
      setShowPopup(false);
      return;
    }

    setSuggestions([]);
    setIsSearchFocused(false);
    setShowPopup(true);
    onSelect?.(searchTerm);
  };

  return (
    <div ref={containerRef} className="search-container">
      <div className="search-bar">
        <svg className="search-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1 0 4.5 4.5a7.5 7.5 0 0 0 12.15 12.15z" />
        </svg>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar Pokémon..."
          onFocus={() => setIsSearchFocused(true)}
        />

        <button className="search-button" onClick={handleSearchClick}>
          Buscar
        </button>
      </div>

      {isSearchFocused && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((p) => (
            <li key={p.name} onClick={() => handleSelectSuggestion(p.name)}>
              {p.name}
            </li>
          ))}
        </ul>
      )}

      {showPopup && validNames.includes(searchTerm.toLowerCase()) && (
        <div className="pokemon-inf-container">
          <PokemonInf nombre={searchTerm} onClick={() => setShowPopup(false)} />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
