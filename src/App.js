import './App.css';
import React, { Suspense, useEffect, useState} from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import globalTheme from './Theme';
import { finalRoutes } from './routes';
import { AlertContext } from './context';

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const userId = localStorage.getItem("userId") || null
  useEffect(() => {
    if (!userId) {
      navigate('/login')
    }
  }, [userId])
  
  useEffect(() => {
    const isRememberMe = localStorage.getItem("rememberMe");
    const clearLocalStorage = () => {
      localStorage.clear();
    };

    if (isRememberMe === "false") {
      window.addEventListener("unload", clearLocalStorage);
      return () => {
        window.removeEventListener("unload", clearLocalStorage);
      };
    }
  }, []);

  const [dataAlert, setDataAlert] = useState({
    severity: 'warning',
    message: '',
    open: false,
  })

  const onCloseAlert = () => {
    setDataAlert((prevState) => ({
      ...prevState,
      open: false,
    }))
  }
  const value = { dataAlert, setDataAlert, onCloseAlert };

  useEffect(() => {
    onCloseAlert();
  }, [location])

  return (
    <ThemeProvider theme={globalTheme}>
      <AlertContext.Provider value={value}>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            {finalRoutes().map((res, idx) => {
              return <Route path={res.path} element={res.element} key={`${idx + 1}-route-path`} />
            })}
          </Routes>
        </Suspense>
      </AlertContext.Provider>
    </ThemeProvider>
  );
}

export default App;