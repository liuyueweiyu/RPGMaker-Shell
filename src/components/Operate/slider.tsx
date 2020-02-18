import { Menu } from 'antd';
import React,{ useState } from 'react';
import store from '../../redux/index';
import { Project } from '../Project/project';
const { SubMenu } = Menu;


function Sider() {
  const [current, setCurrent] = useState('')
  const [list, setList] = useState(store.getState().projects as Array<Project>)
  store.subscribe(()=>{
    if(store.getState().projects !== list) {
      setList(store.getState().projects)
    }
  })
  const handleClick = (e:any )=> {
    console.log('click ', e);
    setCurrent(e.key);
  };
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
                    <span>{v.name}</span>
                  </span>
                )}
              >
                {
                  // tslint:disable-next-line: jsx-no-multiline-js
                  v.files.map((file)=>{
                    return (
                      <Menu.Item key={file.id.toString()}>{file.name}</Menu.Item>
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