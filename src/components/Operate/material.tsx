import React, { useState } from 'react';
import { Menu } from 'antd';
import { WINDOW_MENU_HEIGHT } from '../Render/constant/window';
import { engine } from '../Render/state/engine';

function Material() {
    const [current, setCurrent] = useState("1");
    const testClick = ()=>{
        engine.api.callAPICallBack("SetNextAddWidgetsType",{ nextWidgets : [['pool-1-normal-1']] },(res)=>{
            console.log('test:',res)
        })
    }
    return (
        <div style={{height:`calc(50vh - ${WINDOW_MENU_HEIGHT}px)`,position:'relative',borderRight:'1px solid #e8e8e8'}}>
            <div style={{background:"red",width:'100px',height:'100px'}} onClick={testClick}>
                text
            </div>
            <Menu 
                style={{position:'absolute', width:'100%', bottom:'0',borderTop:'1px solid #e8e8e8'}} 
                selectedKeys={[current]}
                onClick={e=>setCurrent(e.key)} 
                mode="horizontal"
            >
                <Menu.Item key="1">
                    A
                </Menu.Item>
                <Menu.Item key="2">
                    B
                </Menu.Item>
                <Menu.Item key="3">
                    C
                </Menu.Item>
                <Menu.Item key="4">
                    D
                </Menu.Item>
            </Menu>
        </div>
    )
}
export default Material;