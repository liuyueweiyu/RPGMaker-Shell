import { Menu, Icon } from 'antd';
import React,{ useState } from 'react';

function GameMenu() {
    const [current, setCurrent] = useState("");
    return (
        <Menu selectedKeys={[current]} onClick={e=>setCurrent(e.key)} mode="horizontal">
            <Menu.Item key="folder-add">
            <Icon type="folder-add" />
                新建项目
            </Menu.Item>
            <Menu.Item key="folder-open">
                <Icon type="folder-open" />
                打开项目
            </Menu.Item>
            <Menu.Item key="file">
                <Icon type="file" />
                新建地图文件
            </Menu.Item>
            <Menu.Item key="save">
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
    )
}

export default GameMenu