import './App.css';
import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from 'react-router';
import globalTheme from './Theme';
import { routes } from './routes';

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <Routes>
        {routes.map((res, idx) => {
          return <Route path={res.path} element={res.element} key={`${idx + 1}-route-path`} />
        })}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
