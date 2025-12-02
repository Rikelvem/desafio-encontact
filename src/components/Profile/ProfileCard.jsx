import React, { useContext, useEffect, useState } from "react";
import "./ProfileCard.css";
import { AuthContext } from "../../context/AuthContext";
import ThemeSwitcher from "../Theme/ThemeSwitcher";
import LanguageSelector from "../Language/LanguageSelector";
import { assets } from "../../assets/assets";

const ProfileCard = ({ theme, setTheme }) => {
  const initials = getInitials("Rikelvem Silva");

  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const [openLang, setOpenLang] = useState(false);
  const toggleLangMenu = () => setOpenLang(!openLang);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="profile-card">
      <div className="avatar">{initials}</div>

      <div className="profile-info">
        <h3>{"Rikelvem"}</h3>
        <p>Programador</p>
      </div>
      <button className="profile-options-btn" onClick={() => setOpen(!open)}>
        ⋮
      </button>
      {open && (
        <div className="profile-options-dropdown">
          <button className="logout" onClick={logout}>Sair</button>
          <hr />
          <button onClick={toggleTheme}><ThemeSwitcher theme={theme} setTheme={setTheme} />Mudar o tema</button>
          <hr />
          <button onClick={toggleLangMenu}>
            <LanguageSelector
              theme={theme}
              assets={assets}
              open={openLang}
              setOpen={setOpenLang}
            />
            Mudar o idioma
          </button>
        </div>
      )}
    </div>
  );
};

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  const initials = parts.map(p => p[0].toUpperCase());
  return initials.slice(0, 2).join("");
};

export default ProfileCard;
