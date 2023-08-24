import './App.css';
import React, { Suspense, useState} from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from 'react-router';
import globalTheme from './Theme';
import { finalRoutes } from './routes';
import { AlertContext } from './context';
// import { useAuth } from 'react-oidc-context';

const App = () => {
  // const [valRoute, setRoute] = useState([])
  // useEffect(() => {
  //   console.log('final routes: ', finalRoutes())
  //   setRoute(finalRoutes())
  // }, [])
  // const navigate = useNavigate()
  // const auth = useAuth();
  // useEffect(() => {
  //   console.log('no token: ', auth)
  //   if (!auth.isLoading) {
  //     if (auth.isAuthenticated) {
  //       navigate('/')
  //     } else {
  //       navigate('login')
  //     }
  //   }
  // }, [auth.isLoading])
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
