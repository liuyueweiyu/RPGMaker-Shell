import React from 'react';
import { WINDOW_PROPERTY_WIDTH,WINDOW_MENU_HEIGHT } from '../Render/constant/window';
function Property() {
    return (
        // tslint:disable-next-line: jsx-self-close
        <div style={{width:WINDOW_PROPERTY_WIDTH,float:'right',height:`calc(100vh - ${WINDOW_MENU_HEIGHT}px)`,borderLeft:'1px solid #e8e8e8',boxSizing:"border-box"}}>
        </div>
    )
}

export default Property;
