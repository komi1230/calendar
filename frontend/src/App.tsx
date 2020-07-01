import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { CreatePage } from './pages/Top';
import './styles/App.css';


const App: React.FC = () => {
  return (
    <CreatePage />
  )
}

export default App;
