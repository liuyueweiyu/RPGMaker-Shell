import React from 'react';
import './App.css';
import Menu from './components/Operate/menu';
import Dashbord from './components/Operate/dashboard';
import Property from './components/Operate/property';
const App = () => {
  return (
    <div className="App">
      <Menu />
      <Dashbord />
      <Property />
    </div>
  );
}

export default App;
