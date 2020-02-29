import { Layout, Spin } from 'antd';
import React from 'react';
import './styles.css';
import SideBar from '../../components/SideBar';
import routes from '../../routes';
import { Route } from 'react-router-dom';
import UserManage from './UserManage';
import MyHeader from '../../components/Header';
import { connect } from 'react-redux';
import RequestManage from './RequestManage';

const { Content, Footer } = Layout;

class HomePage extends React.Component {
  getRoutes = routes => {
    return routes.map(item => {
      return item.items ? (
        item.items.map(item => {
          return (
            <Route
              exact={item.exact}
              path={item.layout + item.path}
              component={item.component}
              key={item.key}
            />
          );
        })
      ) : (
        <Route
          path={item.layout + item.path}
          component={item.component}
          key={item.key}
        />
      );
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar routes={routes} />
        <Layout>
          <MyHeader />
          <Spin size="large" spinning={this.props.loading}>
            <Content>
              {this.getRoutes(routes)}
              <Route exact path="/home" component={UserManage} />
            </Content>
          </Spin>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2020 Created by Finviet Corp
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapState = state => {
  const { loading } = state;
  return { loading };
};

export default connect(mapState, null)(HomePage);
