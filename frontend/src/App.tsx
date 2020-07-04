import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { CreatePage } from './pages/Top';
import { Table } from './pages/Table';
import './styles/App.css';


const App: React.FC = () => {
  return (
    <CreatePage />
    // <Table />
  )
}

export default App;
