import { useTranslation } from "react-i18next";
import "./LanguageSelector.css";

const LanguageSelector = ({ theme, assets, open, setOpen }) => { 
  const { i18n } = useTranslation();

  const switchLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  return (
    <div className="language-container">
        <img className="language-btn"
          src={theme === "light" ? assets.globeDark : assets.globeLight}
          alt="Idioma"/>
      {open && (
        <div className={`language-menu`}>
          <button onClick={() => switchLang("pt")}>🇧🇷 Português</button>
          <button onClick={() => switchLang("en")}>🇺🇸 English</button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;