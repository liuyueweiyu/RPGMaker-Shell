import { Menu } from 'antd';
import React,{ useState } from 'react';
import store from '../../redux/index';
import { setOpenedProjectAction, setOpenedFileAction } from '../../redux/anction';
import { Project } from '../Project/project';
const { SubMenu } = Menu;


function Sider() {
  const [current, setCurrent] = useState('')
  const [list, setList] = useState(store.getState().projects as Array<Project>)
  const [openProject, setOpenedProject] = useState(store.getState().openedProject);
  const [openFile, setOpenedFile] = useState(store.getState().openedMapFile);

  store.subscribe(()=>{
    if(store.getState().projects !== list) {
      setList(store.getState().projects)
    }
    if(store.getState().openedProject !== openProject){
      setOpenedProject(store.getState().openedProject );
    }
  })
  const handleClick = (e:any )=> {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const openProjectEvent = (id:number)=>{
    // 打开一个i项目前确认其他项目的文件都关闭
    if(id !== 0) {
      openMapFileEvent(0);
    }
    const flag = openProject === id ? 0:id;
    setOpenedProject(flag);
    store.dispatch(setOpenedProjectAction(flag));
    
  }
  const openMapFileEvent = (id:number) =>{
    if(id !== openFile) {
      setOpenedFile(id);
      store.dispatch(setOpenedFileAction(id));
    }
  }
  return (
    <div>
      <Menu
        onClick={handleClick}
        style={{ width: '100%' }}
        selectedKeys={[current]}
        mode="inline"
      >
        {
          list.map((v)=>{
            return (
              <SubMenu
                key={v.id.toString()}
                // tslint:disable-next-line: jsx-no-multiline-js
                title={(
                  <span>
                    <span style={openProject !== v.id ? {} : {color :'#1890ff'}}>
                      {v.name}
                    </span>
                  </span>
                )}
                onTitleClick={openProjectEvent.bind(undefined,v.id)}
              >
                {
                  // tslint:disable-next-line: jsx-no-multiline-js
                  v.files.map((file)=>{
                    return (
                      <Menu.Item key={file.id.toString()} onClick={openMapFileEvent.bind(undefined,file.id)}>{file.name}</Menu.Item>
                    )
                  })
                }
                
              </SubMenu>
            )
          })
        }
      </Menu>
    </div>
  );
}

export default Sider;