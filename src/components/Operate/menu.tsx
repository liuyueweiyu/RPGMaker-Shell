import { Menu, Icon, Input, message } from 'antd';
import React,{ useState } from 'react';
import { Modal,InputNumber } from 'antd';
import  store from '../../redux';
import { addProjectAction, addFileAction } from '../../redux/anction';
import { LOCALSTORAFE_ITEM_MAP } from '../Render/constant/project';
import { engine } from '../Render/state/engine';

function GameMenu() {
    const [current, setCurrent] = useState("");
    
    const [addProjectFlag,setAddProjectFlag] = useState(false);
    const [addProjectText,setAddProjectText] = useState("");
    const addProjectEvent = ()=>{
        setAddProjectFlag(false);
        store.dispatch(addProjectAction(addProjectText));
        setAddProjectText("");
    }

    const save = ()=>{
        const state = store.getState();
        state.openedMapFile = 0;
        state.openedProject = 0;
        localStorage.setItem(LOCALSTORAFE_ITEM_MAP,JSON.stringify(state))
    }

    const [addFileFlag, setAddFileFlag] = useState(false);
    const [addFileText, setAddFileText] = useState("");
    const [mapColumn, setMapColumn] = useState(0)
    const [mapRow,setMapRow] = useState(0);
    const addFileEvent = ()=>{
        if(store.getState().openedProject === 0) {
            message.warn("当前无打开项目!");
        } else {
            setAddFileFlag(false);
            store.dispatch(addFileAction(addFileText,mapRow,mapColumn,store.getState().openedProject));
            setMapColumn(0);
            setMapRow(0)
        }
    }
    return (
        <React.Fragment>
            <Menu selectedKeys={[current]} onClick={e=>setCurrent(e.key)} mode="horizontal">
                <Menu.Item key="folder-add" onClick={()=>{setAddProjectFlag(true)}}>
                <Icon type="folder-add"  />
                    新建项目
                </Menu.Item>
                <Menu.Item key="folder-open">
                    <Icon type="folder-open" />
                    打开项目
                </Menu.Item>
                <Menu.Item key="file" onClick={()=>{setAddFileFlag(true)}}>
                    <Icon type="file" />
                    新建地图文件
                </Menu.Item>
                <Menu.Item key="save" onClick={save}>
                    <Icon type="save" />
                    保存文件
                </Menu.Item>
                <Menu.Item key="copy">
                    <Icon type="copy" />
                    复制
                </Menu.Item>
                <Menu.Item key="scissor">
                    <Icon type="scissor" />
                    粘贴
                </Menu.Item>
                <Menu.Item  key="delete">
                    <Icon type="delete"/>
                    删除
                </Menu.Item>
                <Menu.Item key="undo">
                    <Icon type="undo" />
                    撤销
                </Menu.Item>
                <Menu.Item key="redo">
                    <Icon type="redo" />
                    重做
                </Menu.Item>
                <Menu.Item key="edit">
                    <Icon type="edit"/>
                    单点绘制
                </Menu.Item>
                <Menu.Item key="drag">
                    <Icon type="drag" />
                    拖拽绘制
                </Menu.Item>
                <Menu.Item key="highlight">
                    <Icon type="highlight" />
                    阴影绘制
                </Menu.Item>
                <Menu.Item key="select">
                    <Icon type="select" />
                    选择
                </Menu.Item>
                <Menu.Item key="database">
                    <Icon type="database" />
                    数据管理
                </Menu.Item>
                <Menu.Item key="sound">
                    <Icon type="sound" />
                    声音管理
                </Menu.Item>
                <Menu.Item key="play-circle">
                    <Icon type="play-circle" />
                    测试游戏
                </Menu.Item>
            </Menu>
            <Modal 
                title="新建项目" 
                okText="确认"
                cancelText="取消"
                visible={addProjectFlag} 
                onOk={addProjectEvent} 
                onCancel={()=>{setAddProjectFlag(false)}}
            >
                <Input onChange={(e)=>{setAddProjectText(e.target.value)}} placeholder="请输入项目名称" />
            </Modal>
            <Modal 
                title="新建地图文件" 
                okText="确认"
                cancelText="取消"
                visible={addFileFlag}  
                onOk={addFileEvent} 
                onCancel={()=>{setAddFileFlag(false)}}
            >
                <Input onChange={(e)=>{setAddFileText(e.target.value)}} placeholder="请输入文件名称" />
                <br />
                <br />
                创建地图规格： <InputNumber min={1} max={1000} onChange={(value)=>{value && setMapRow(value)}}/>(行) 
                x  <InputNumber min={1} max={1000}  onChange={(value)=>{value && setMapColumn(value)}} /> (列)
            </Modal>
        </React.Fragment>

    )
}

export default GameMenu