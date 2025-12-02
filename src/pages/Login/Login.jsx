import React, { useContext, useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../components/Language/LanguageSelector";
import ThemeSwitcher from '../../components/Theme/ThemeSwitcher';

const Login = ({ theme, setTheme }) => {

    const { t } = useTranslation();
    const { user, password, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [openLang, setOpenLang] = useState(false);
    const toggleLangMenu = () => setOpenLang(!openLang);

    const onLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.text.value;
        const pwd = form.password.value;

        if (username === user && pwd === password) {
            login();
            navigate('/');
        } else {
            toast.error(t("invalidCredentials"), {
                position: "top-center",
                theme: "colored",
                hideProgressBar: true,
                closeOnClick: true
            });
        }
    };

    return (
        <div>
            <form onSubmit={onLogin}>
                <div className="login-bg">
                    <div className="login-center">
                        <div className='login-card'>
                            <div className="card-info">
                                <h2 className="title">{t("loginTitle")}</h2>
                                <input type="text" name="text" placeholder={t("username")} required />
                                <input type="password" name="password" placeholder={t("password")} required />
                                <button className='submit' type="submit">{t("loginButton")}</button>
                                <div className='buttons-change'>
                                    <button type="button" className='theme'>
                                        <ThemeSwitcher theme={theme} setTheme={setTheme} />
                                    </button>
                                    <button type="button" className='language' onClick={toggleLangMenu}>
                                        <LanguageSelector theme={theme} assets={assets} open={openLang} setOpen={setOpenLang} />
                                    </button>
                                </div>
                            </div>
                            <div className="card-image">
                                <img src={assets.loginImage} alt="Login" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
