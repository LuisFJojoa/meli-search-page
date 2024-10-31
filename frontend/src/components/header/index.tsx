import React, { useState } from 'react';
import './header.module.scss';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Mi Aplicación</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar..."
          className="search-input"
        />
      </div>
    </header>
  );
};
