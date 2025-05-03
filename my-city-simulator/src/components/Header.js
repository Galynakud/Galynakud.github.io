import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1><em>Симулятор управління містом</em></h1>
      <nav>
        <ul>
          <li><em><Link to="/">Головна</Link></em></li>
          <li><em><Link to="/construction">Будівництво</Link></em></li>
          <li><em><Link to="/resources">Ресурси міста</Link></em></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
