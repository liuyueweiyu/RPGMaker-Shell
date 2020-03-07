import React,{ useState } from 'react';
import { WINDOW_PROPERTY_WIDTH,WINDOW_MENU_HEIGHT } from '../Render/constant/window';
import store from '../../redux';
import { engine } from '../Render/state/engine';
function Property() {
    const [activeNodes,setActivedNode] = useState("");
    const [hoverNodes,setHoverNode] = useState("");
    store.subscribe(()=>{
        const a = JSON.stringify(store.getState().activeNodes);
        const h = JSON.stringify(store.getState().hoverNodes);
        if(a !== activeNodes) {
            setActivedNode(a);
        }
        if(h !== hoverNodes){
            setHoverNode(h);
        }
    })
    engine.api.registerTriggerCallBack("AddWidgetCallBack",(res)=>{
        console.log(res)
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
            <p>activeNodes:</p>
            <p>{activeNodes}</p>
            <p>---------</p>
            <p>hoverNodes:</p>
            <p>{hoverNodes}</p>
        </div>
    )
}

export default Property;
