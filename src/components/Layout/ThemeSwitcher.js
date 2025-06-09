// src/components/Layout/ThemeSwitcher.js

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const THEMES = [
  { id: "retro-pixel", name: "Retro Pixel", img: "/assets/themes/retro-pixel.png" },
  { id: "sakura-blossom", name: "Sakura Blossom", img: "/assets/themes/sakura-blossom.png" },
  { id: "cyberpunk-neon", name: "Cyberpunk Neon", img: "/assets/themes/cyberpunk-neon.png" },
  { id: "minimal-light", name: "Minimal Light", img: "/assets/themes/minimal-light.png" },
  { id: "cozy-cafe", name: "Cozy Cafe", img: "/assets/themes/cozy-cafe.png" },
];

export default function ThemeSwitcher({ isOpen, onClose, onThemeChange, currentThemeId }) {
  const [selectedId, setSelectedId] = useState(currentThemeId);

  useEffect(() => {
    setSelectedId(currentThemeId);
  }, [currentThemeId]);

  const handleSelect = (id) => {
    setSelectedId(id);
    if (onThemeChange) onThemeChange(id);
  };

  if (!isOpen) return null;

  return (
    <div
      aria-label="Theme Switcher Panel"
      role="dialog"
      aria-modal="true"
      className="fixed bottom-6 left-0 right-0 max-w-md mx-auto bg-white rounded-xl shadow-xl p-6 z-60 flex flex-col space-y-4 ring-1 ring-black ring-opacity-5"
    >
      <header className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-extrabold text-gray-900 select-none">Choose Theme</h3>
        <button
          onClick={onClose}
          aria-label="Close Theme Switcher"
          className="text-gray-500 hover:text-gray-900 transition-colors"
        >
          &#x2715;
        </button>
      </header>

      <ul className="grid grid-cols-2 gap-4">
        {THEMES.map(({ id, name, img }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => handleSelect(id)}
              className={`w-full rounded-xl overflow-hidden shadow-card cursor-pointer focus:outline-none focus:ring-2 focus:ring-black transition-transform duration-300 ${
                selectedId === id ? "ring-2 ring-black scale-105" : "hover:scale-105"
              }`}
              aria-label={`Select ${name} theme`}
            >
              <img
                src={img}
                alt={`${name} theme preview`}
                className="w-full h-32 object-cover select-none pointer-events-none"
                draggable={false}
              />
              <div className="px-4 py-2 text-center font-semibold text-gray-900 bg-white select-none">
                {name}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ThemeSwitcher.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onThemeChange: PropTypes.func.isRequired,
  currentThemeId: PropTypes.string,
};

ThemeSwitcher.defaultProps = {
  currentThemeId: "minimal-light",
};
