import React from 'react';
import { WINDOW_DASHBORD_WIDTH } from '../Render/constant/window';
import Slider from './slider';
import Meterial from './material';
function Dashbord() {
  return (
    <div style={{width : WINDOW_DASHBORD_WIDTH,float:"left",boxSizing:"border-box"}}>
      <Meterial />
      <Slider />
    </div>
  )
}

export default Dashbord