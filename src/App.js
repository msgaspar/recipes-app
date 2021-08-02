import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import FoodsProvider from './context/FoodsProvider';

function App() {
  return (
    <FoodsProvider>
      <Routes />
    </FoodsProvider>
  );
}

export default App;
