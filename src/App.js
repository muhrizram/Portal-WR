import './App.css';
import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from 'react-router';
import globalTheme from './Theme';
import LoginScreen from './Layouts/Login';
import Dashboard from './Layouts/Dashboard';

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path='dashboard' element={<Dashboard />} /> 
      </Routes>
    </ThemeProvider>
  );
}

export default App;
