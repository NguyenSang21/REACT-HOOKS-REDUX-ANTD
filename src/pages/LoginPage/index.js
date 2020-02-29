import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import './styles.css';
import logo from '../../assets/logo.svg';
import { userActions } from '../../actions/user.action';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      this.props.login(values.username, values.password);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <div className="top" />
        <div className="title-logo">
          <h1>Hệ thống quản lý dự án DSA</h1>
        </div>
        <div className="main">
          <Card
            style={{
              width: '100%',
              borderRadius: 10,
              background: '#ffffff',
              boxShadow: '2px 2px #e0dfdf',
              border: '1px solid #e4e1e1'
            }}
          >
            <Form className="login-form" onSubmit={this.handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <img alt="logo" className="logo" src={logo} />
                <span className="subTitle">DSA LOGIN</span>
              </div>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: 'Vui lòng nhập username!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Tên đăng nhập"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Vui lòng nhập password!' }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Mật khẩu"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(<Checkbox>Nhớ mật khẩu</Checkbox>)}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 10 }}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <footer className="footer">
          <p>Copyright © 2020 All rights Reserved | Finviet Corp</p>
        </footer>
        {localStorage.getItem('user') ? (
          <Redirect to={{ pathname: '/home' }} />
        ) : null}
      </div>
    );
  }
}

const mapState = state => {
  const { loggingIn } = state.authentication;
  return { loggingIn };
};

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

const LoginPage = Form.create({ name: 'login_form' })(LoginForm);

export default connect(mapState, actionCreators)(LoginPage);
