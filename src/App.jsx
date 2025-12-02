import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from './context/AuthContext';

const App = () => {

  const { isLogged, uriMenus } = useContext(AuthContext);
  const currentTheme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(currentTheme ? currentTheme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <>
      <ToastContainer />
      <div className={`${theme}`}>
        <Routes>
          <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />
          <Route path="/"
            element={isLogged ? <Home theme={theme} setTheme={setTheme} url={uriMenus} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
