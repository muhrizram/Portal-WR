import './App.css';
import React, { Suspense, useEffect} from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes, useNavigate } from 'react-router';
import globalTheme from './Theme';
import { routes } from './routes';
import { useAuth } from 'react-oidc-context';

const App = () => {
  const navigate = useNavigate()
  const auth = useAuth();
  useEffect(() => {
    console.log('no token: ', auth)
    if (!auth.isLoading) {
      if (auth.isAuthenticated) {
        navigate('/')
      } else {
        navigate('/login')
      }
    }
  }, [auth.isLoading])

  // console.log('no token: ', auth)

  return (
    <ThemeProvider theme={globalTheme}>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {routes.map((res, idx) => {
            return <Route path={res.path} element={res.element} key={`${idx + 1}-route-path`} />
          })}
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
