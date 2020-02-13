import { Menu, Icon } from 'antd';
import React from 'react';
const { SubMenu } = Menu;

class Slider extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = (openKeys:Array<string>) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (latestOpenKey && this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: '100%',height:'50vh' }}
      >
        <SubMenu
          key="sub1"
          // tslint:disable-next-line: jsx-no-multiline-js
          title={
            (
              <span>
                <Icon type="folder" />
                <span>项目1</span>x
              </span>
            )
        }
        >
          <Menu.Item key="1">
            <Icon type="file" />
            Option 1
          </Menu.Item>
          <Menu.Item key="2"><Icon type="file" />Option 2</Menu.Item>
          <Menu.Item key="3"><Icon type="file" />Option 3</Menu.Item>
          <Menu.Item key="4"><Icon type="file" />Option 4</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}



export default Slider