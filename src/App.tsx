import React from 'react';
import './App.css';
import Render from './components/Render';

const App = () => {
  return (
    <div className="App">
      <Render width={600} height={600} />
    </div>
  );
}

export default App;
