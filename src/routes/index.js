import UserManage from '../pages/HomePage/UserManage';
import RequestManage from '../pages/HomePage/RequestManage';

const routes = [
  {
    module: 'Người dùng',
    icon: 'user',
    items: [
      {
        key: 1,
        path: '/user-manage',
        exact: true,
        icon: 'idcard',
        layout: '/home',
        name: 'Danh sách',
        component: UserManage
      }
    ]
  },
  {
    module: 'Yêu cầu',
    icon: 'user',
    items: [
      {
        key: 2,
        path: '/request-manage',
        exact: true,
        icon: 'idcard',
        layout: '/home',
        name: 'Đăng ký hồ sơ vay',
        component: RequestManage
      }
    ]
  },
  {
    module: 'Chức năng',
    icon: 'appstore',
    items: [
      {
        key: 3,
        path: '/performance-manage',
        exact: true,
        icon: 'project',
        layout: '/home',
        name: 'Quản lý hiệu suất',
        component: ''
      },
      {
        key: 4,
        path: '/income-manage',
        exact: true,
        icon: 'switcher',
        layout: '/home',
        name: 'Quản lý thu nhập',
        component: ''
      },
      {
        key: 5,
        path: '/fund-manage',
        exact: true,
        icon: 'profile',
        layout: '/home',
        name: 'Quản lý hồ sơ vay',
        component: ''
      }
    ]
  },
  {
    key: 6,
    path: '/approve-manage',
    exact: true,
    icon: 'schedule',
    layout: '/home',
    name: 'Duyệt chi trả',
    component: ''
  }
];

export default routes;
