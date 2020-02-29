import React, { Component } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { userService } from '../../../services';
import { connect } from 'react-redux';
import { loadingActions, notifyActions } from '../../../actions';
const { Option } = Select;

class CreateUserForm extends Component {
  state = {
    confirmDirty: false
  };

  componentDidMount() {
    this.props.form.setFieldsValue({
      username: '',
      password: '',
      confirm: '',
      firstName: '',
      lastName: '',
      ID: '',
      phoneNumber: '',
      email: '',
      address: '',
      codeDurationTime: 'onDay'
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('PrevProps==', prevProps);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleOk = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const result = await userService.createUser(values);
        console.log('DATA==', result);
        if (result.success) {
          this.props.onClose();
          this.props.notify_success('Tạo user thành công!');
          this.props.reload();
        } else {
          // this.props.notify_failure("Tạo user thất bại!")
        }
      }
    });
  };

  handleCancel = () => {
    this.props.onClose();
  };

  handleChangeDurationTime = value => {
    console.log(`selected ${value}`);
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Mật khẩu không khớp với nhau!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isOpen } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 15 }
    };

    return (
      <Modal
        width={700}
        bodyStyle={{ height: 700 }}
        maskClosable={false}
        title="Đăng ký user"
        visible={isOpen}
        onOk={this.handleOk}
        okText={'Đăng ký'}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Username" hasFeedback>
            {getFieldDecorator('username', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập username!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input placeholder="Nhập vào username" />)}
          </Form.Item>

          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập password!'
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password placeholder="Nhập vào password!" />)}
          </Form.Item>

          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Vui lòng xác nhận password!'
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                placeholder="Nhập lại password!"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Tên:">
            {getFieldDecorator('firstName', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Nhập vào tên của bạn!'
                }
              ]
            })(<Input placeholder="Nhập vào tên của bạn" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Họ:">
            {getFieldDecorator('lastName', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Nhập vào họ của bạn!'
                }
              ]
            })(<Input placeholder="Nhập vào họ của bạn" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="CMND:">
            {getFieldDecorator('ID', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Nhập vào CMND của bạn!'
                }
              ]
            })(<Input placeholder="Nhập vào CMND" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="SĐT:">
            {getFieldDecorator('phoneNumber', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Nhập vào số điện thoại của bạn!'
                }
              ]
            })(<Input placeholder="Nhập vào số điện thoại!" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Email:">
            {getFieldDecorator('email', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Nhập vào email của bạn'
                }
              ]
            })(<Input placeholder="Nhập vào mail của bạn!" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Địa chỉ:">
            {getFieldDecorator('address', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: 'Nhập vào địa chỉ!'
                }
              ]
            })(<Input placeholder="Nhập vào địa chỉ!" />)}
          </Form.Item>

          <Form.Item label="Hiệu lực:" hasFeedback>
            {getFieldDecorator('codeDurationTime', {
              initialValue: 'oneDay',
              rules: [
                { required: true, message: 'Vui lòng chọn thời gian hiệu lực!' }
              ]
            })(
              <Select
                style={{ width: '100%' }}
                onChange={this.handleChangeDurationTime}
              >
                <Option value="oneDay">1 Ngày</Option>
                <Option value="oneWeek">1 Tuần</Option>
                <Option value="oneMonth">1 Tháng</Option>
                <Option value="oneQuarter">1 Qúy</Option>
                <Option value="oneYear">1 Năm</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const CreateUserModal = Form.create({ name: 'create_user_form' })(
  CreateUserForm
);

const actionCreators = {
  startLoading: loadingActions.start,
  endLoading: loadingActions.end,
  notify_success: notifyActions.success,
  notify_failure: notifyActions.failure
};

export default connect(null, actionCreators)(CreateUserModal);
