import React,{ useState } from 'react';
import { WINDOW_PROPERTY_WIDTH,WINDOW_MENU_HEIGHT } from '../Render/constant/window';
import store from '../../redux';
function Property() {
    const [property,setProperty] = useState("");
    store.subscribe(()=>{
        const p = JSON.stringify(store.getState().selectedNodes);
        if(p !== property) {
            setProperty(p);
        }
    })
    return (
        // tslint:disable-next-line: jsx-self-close
        <div 
            // tslint:disable-next-line: jsx-no-multiline-js
            style={
                {
                    width:WINDOW_PROPERTY_WIDTH,
                    float:'right',
                    wordBreak : 'break-all',
                    height:`calc(100vh - ${WINDOW_MENU_HEIGHT}px)`,
                    borderLeft:'1px solid #e8e8e8',
                    boxSizing:"border-box"
                }
            }
        >
            <p>{property}</p>
        </div>
    )
}

export default Property;
