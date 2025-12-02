import React, { useEffect, useState } from "react";
import "./ItemList.css";

const ItemList = ({ selectedId, archiveSignal }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedItems, setSelectedItems] = useState({});

  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (!selectedId) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://my-json-server.typicode.com/EnkiGroup/desafio-front-2025-2q/items/${selectedId}`
        );
        const data = await response.json();
        setItems(data?.subMenuItems || []);
        setSelectedItems({});
      } catch (error) {
        console.log("Erro ao carregar itens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedId]);

  useEffect(() => {
    if (archiveSignal === 0) return;

    const remaining = items.filter(item => !selectedItems[item.id]);
    setItems(remaining);
    setSelectedItems({});
  }, [archiveSignal]);

  const toggleItem = (id) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!selectedId)
    return <p className="itemlist-empty">Selecione um item do menu.</p>;

  if (loading)
    return <p className="itemlist-loading">Carregando...</p>;

  return (
    <div className="itemlist-container">

      {items.length === 0 && (
        <p className="itemlist-empty">Nenhum item encontrado.</p>
      )}

      {items.map((item) => {
        const isSelected = !!selectedItems[item.id];

        return (
          <div
            key={item.id}
            className="item-card"
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="card-left">
              {hovered === item.id || isSelected ? (
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleItem(item.id)}
                  className="owner-checkbox"
                />
              ) : (
                <div className="owner-circle">{item.owner}</div>
              )}

              <div className="texts">
                <p className="name">{item.name}</p>
                <p className="subject">{item.subject}</p>
              </div>
            </div>
            
            <div className="users">
              {isSelected
                ? item.users.map((u, i) => (
                    <input
                      key={i}
                      type="checkbox"
                      className="user-checkbox"
                      checked={true}
                      onChange={() => toggleItem(item.id)}
                    />
                  ))
                : item.users.map((u, i) => (
                    <div key={i} className="user-circle">
                      {u}
                    </div>
                  ))}
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
