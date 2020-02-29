import React, { Component } from 'react';
import { PageHeader, Avatar } from 'antd';
import './styles.css';

const routes = [
  {
    key: 1,
    path: 'index',
    breadcrumbName: 'Yêu cầu'
  },
  {
    key: 2,
    path: 'first',
    breadcrumbName: 'Vay vốn'
  },
  {
    key: 3,
    path: 'second',
    breadcrumbName: 'Thông tin cơ bản'
  }
];

const UserInfo = () => {
  return (
    <div>
      <Avatar src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4" />
      <span style={{ fontWeight: 600, fontSize: 20 }}>Nguyễn Sang</span>
    </div>
  );
};

class MyHeader extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#F5F5F5'
        }}
      >
        <PageHeader
          ghost={false}
          title="Đăng ký hồ sơ vay"
          subTitle=""
          extra={[<UserInfo key={1} />]}
          breadcrumb={{ routes }}
        ></PageHeader>
      </div>
    );
  }
}

export default MyHeader;
