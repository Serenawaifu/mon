// src/components/Search/SearchBar.js

import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa"; // Changed from lucide-react to react-icons

export default function SearchBar({ placeholder = "Search anime, manga, manhwa…" , onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // Example stub: Simulated API autocomplete (replace with real API fetch)
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    // Simulate async autocomplete search (debounce recommended in real app)
    const timeout = setTimeout(() => {
      // Dummy suggestions; replace with real API call and cache as needed
      setSuggestions([
        query + " Anime",
        query + " Manga",
        query + " Character",
        query + " Episode",
      ]);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    if (onSearch) onSearch(suggestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
    setSuggestions([]);
  };

  return (
    <div className="relative max-w-lg mx-auto" ref={containerRef}>
      <form onSubmit={handleSubmit} role="search" className="w-full">
        <label htmlFor="search-input" className="sr-only">Search</label>
        <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-black transition">
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-expanded={isFocused && suggestions.length > 0}
            className="flex-grow px-4 py-3 rounded-l-xl text-gray-900 placeholder-gray-400 text-base focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="px-4 py-3 bg-black rounded-r-xl text-white font-semibold text-base hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 transition"
          >
            <FaSearch className="w-5 h-5" /> {/* Changed the icon */}
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-md max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50"
        >
          {suggestions.map((suggestion, i) => (
            <li
              key={i}
              role="option"
              tabIndex={0}
              onClick={() => handleSelectSuggestion(suggestion)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSelectSuggestion(suggestion);
                }
              }}
              className="cursor-pointer px-4 py-3 text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
