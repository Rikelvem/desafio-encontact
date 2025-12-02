import { useTranslation } from "react-i18next";
import { useState } from "react";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const change = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  return (
    <div className="lang-container">
      <button className="icon-btn" onClick={() => setOpen(!open)}>
        🌐
      </button>

      {open && (
        <div className="dropdown">
          <button onClick={() => change("pt")}>🇧🇷 Português</button>
          <button onClick={() => change("en")}>🇺🇸 English</button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
