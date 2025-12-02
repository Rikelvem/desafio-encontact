import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';
import ProfileCard from '../../components/Profile/ProfileCard';
import EmailModal from '../../components/Email/EmailModal';
import MenuComponente from '../../components/Menu/MenuComponente';
import ItemList from '../../components/Item/ItemList';
import { useTranslation } from "react-i18next";

const Home = ({ theme, setTheme }) => {

    const { t } = useTranslation();

    const [openEmail, setOpenEmail] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [isResizing, setIsResizing] = useState(false);

    const startResize = () => setIsResizing(true);
    const stopResize = () => setIsResizing(false);

    const [archiveSignal, setArchiveSignal] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const archiveSelected = () => {
        setArchiveSignal(prev => prev + 1);
    };

    const handleResize = useCallback((e) => {
        if (!isResizing) return;
        const newWidth = e.clientX;
        if (newWidth >= 430 && newWidth <= 700) {
            setSidebarWidth(newWidth);
        }
    }, [isResizing]);

    useEffect(() => {
        window.addEventListener("mousemove", handleResize);
        window.addEventListener("mouseup", stopResize);
        return () => {
            window.removeEventListener("mousemove", handleResize);
            window.removeEventListener("mouseup", stopResize);
        };
    }, [handleResize]);


    const sendEmail = (data) => {
        console.log("Enviando email:", data);
    };

    return (
        <div className="content">
            <div className="left-content" style={{ width: sidebarWidth }}>

                <div className="top-left">
                    <div className='cards'>
                        <ProfileCard theme={theme} setTheme={setTheme} />
                        <button onClick={() => setOpenEmail(true)} className='new-email'>
                            {t("newEmail")}
                        </button>
                        <EmailModal open={openEmail} onClose={() => setOpenEmail(false)} onSend={sendEmail} />
                    </div>
                    <hr />
                </div>

                <div className="middle-left">
                    <h2>{t("accountManagement")}</h2>
                    <MenuComponente onSelect={(id) => setSelectedId(id)} />
                </div>
            </div>

            <div className="resizer" onMouseDown={startResize} />

            <div className="right-content">
                <div className="top-right">
                    <input
                        type="text"
                        placeholder={t("searchEmail")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <hr />

                <div className="filters">
                    <button>{t("assign")}</button>
                    <button onClick={archiveSelected}>{t("archive")}</button>
                    <button>{t("schedule")}</button>
                </div>

                <ItemList
                    selectedId={selectedId}
                    archiveSignal={archiveSignal}
                    searchTerm={searchTerm}
                />
            </div>
        </div>
    );
};

export default Home;
