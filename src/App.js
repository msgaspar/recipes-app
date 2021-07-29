import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <header>HEADER</header>
      <SearchBar />
      <Routes />
    </>
  );
}

export default App;
