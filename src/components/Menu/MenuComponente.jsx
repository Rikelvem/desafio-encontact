import React, { useState, useEffect } from 'react';
import './MenuComponente.css';

const MenuItem = ({ item, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasSubMenus = item.subMenus && item.subMenus.length > 0;

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClickItem = (e) => {
    e.preventDefault();
    if (!hasSubMenus && onSelect) {
      onSelect(item.id);
    }
  };

  return (
    <li className={hasSubMenus ? "menu-item-parent" : "menu-item"}>
      <a
        href="#"
        className={`menu-link ${hasSubMenus ? "toggle-button" : ""}`}
        onClick={hasSubMenus ? handleToggle : handleClickItem}
      >
        {item.name}

        {hasSubMenus && (
          <span className={`toggle-icon ${isOpen ? "open" : "closed"}`}>
            {isOpen ? " ▼" : " ►"}
          </span>
        )}
      </a>

      {hasSubMenus && isOpen && (
        <ul className="submenu-list">
          {item.subMenus.map((subMenu) => (
            <MenuItem
              key={subMenu.id}
              item={subMenu}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};


export { MenuItem };

const MenuComponente = ({ onSelect }) => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const API_URL = 'https://my-json-server.typicode.com/EnkiGroup/desafio-front-2025-2q/menus';

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Falha na API: Status ${response.status}`);
        }

        const data = await response.json();

        setMenuData(data);

      } catch (e) {
        console.error("ERRO FATAL:", e.message);
        setError("Não foi possível carregar o menu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (isLoading) {
    return <div className="menu-loading">Carregando Menu...</div>;
  }

  if (error) {
    return <div className="menu-error" style={{ color: 'red' }}>Erro: {error}</div>;
  }

  return (
    <nav className="menu-container">
      <ul className="main-menu-list">
        {menuData.map(item => (
          <MenuItem key={item.id} item={item} onSelect={onSelect} />
        ))}
      </ul>
    </nav>
  );
};

export default MenuComponente;