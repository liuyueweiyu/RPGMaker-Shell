import React,{ useState } from 'react';
import './App.css';
import { WINDOW_DASHBORD_WIDTH,WINDOW_PROPERTY_WIDTH,WINDOW_MENU_HEIGHT } from './components/Render/constant/window';
import Menu from './components/Operate/menu';
import Dashbord from './components/Operate/dashboard';
import Property from './components/Operate/property';
import Render from './components/Render/index';
import store from './redux';

const App = () => {
  const w = document.body.clientWidth - (WINDOW_DASHBORD_WIDTH+WINDOW_PROPERTY_WIDTH),
        h = document.body.clientHeight - WINDOW_MENU_HEIGHT;
        console.log( document.body.clientWidth,window.innerHeight,window.innerHeight)
  const [flag ,setFlag] = useState(false);
  setTimeout(() => {
    setFlag(true);
  }, 1000);
  return (
     <div className="App" >
      <Menu />
      <Dashbord />
      {flag && <Render width={w} height={h} />}
      <Property />
    </div>
  );
}

export default App;
