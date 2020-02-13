import React from 'react';
import './App.css';
import Menu from './components/Operate/menu';
import Dashbord from './components/Operate/dashboard';
const App = () => {
  return (
    <div className="App">
      <Menu />
      <Dashbord />
    </div>
  );
}

export default App;
