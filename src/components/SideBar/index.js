import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './styles.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const routes = this.props.routes || [];
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="sidebar-logo">
          <img alt="logo" style={{ height: 32, marginRight: 15 }} src={logo} />
          <span style={{ color: 'white', fontSize: 15, fontWeight: 500 }}>
            Dashboard
          </span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2']}
          mode="inline"
        >
          {routes.map((item, idx) => {
            return item.items ? (
              <SubMenu
                key={`sub${idx + 1}`}
                title={
                  <span>
                    <Icon type={item.icon} />
                    {item.module}
                  </span>
                }
              >
                {item.items
                  ? item.items.map(item => {
                      return (
                        <Menu.Item key={item.key}>
                          {item.name}
                          <Link to={item.layout + item.path} />
                        </Menu.Item>
                      );
                    })
                  : null}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key}>
                <Icon type={item.icon} />
                {item.name}
                <Link to={item.layout + item.path} />
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
