import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { userService } from '../../../services';
import { connect } from 'react-redux';
import { notifyActions } from '../../../actions';
const { Option } = Select;

/**
 * @return {null}
 */
function EditUserForm(props) {
  console.log("daawda");
  const formData = props.data;
  const { getFieldDecorator } = props.form;
  const { isOpen } = props;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 }
  };

  useEffect(() => console.log('EFFECT==', formData), []);

  function handleUpdate(e) {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const { data } = props;
        const result = await userService.updateUser(data._id, values);

        if (result.success) {
          props.onClose();
          props.notify_success('Cập nhật thành công!');
          props.reload();
        } else {
          props.notify_failure('Cập nhật thất bại!');
        }
      }
    });
  }

  function handleChangeDurationTime(value) {
    console.log(`selected ${value}`);
  }

  return (
    <Modal
      bodyStyle={{ height: 500 }}
      maskClosable={false}
      title="Cập nhật user"
      visible={isOpen}
      onOk={handleUpdate}
      okText={'Cập nhật'}
      cancelText={'Đóng'}
      onCancel={props.onClose}
    >
      <Form {...formItemLayout}>
        <Form.Item {...formItemLayout} label="Tên:">
          {getFieldDecorator('firstName', {
            initialValue: formData.firstName,
            rules: [
              {
                required: true,
                message: 'Nhập vào tên của bạn!'
              }
            ]
          })(
            <Input
              style={{ width: '100%' }}
              placeholder="Nhập vào tên của bạn!"
            />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Họ:">
          {getFieldDecorator('lastName', {
            initialValue: formData.lastName,
            rules: [
              {
                required: true,
                message: 'Nhập vào họ của bạn!'
              }
            ]
          })(
            <Input
              style={{ width: '100%' }}
              placeholder="Nhập vào họ của bạn!"
            />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="CMND:">
          {getFieldDecorator('ID', {
            initialValue: formData.ID,
            rules: [
              {
                required: true,
                message: 'Nhập vào CMND của bạn!'
              }
            ]
          })(<Input style={{ width: '100%' }} placeholder="Nhập vào CMND" />)}
        </Form.Item>

        <Form.Item {...formItemLayout} label="SĐT:">
          {getFieldDecorator('phoneNumber', {
            initialValue: formData.phoneNumber,
            rules: [
              {
                required: true,
                message: 'Nhập vào số điện thoại của bạn!'
              }
            ]
          })(
            <Input
              style={{ width: '100%' }}
              placeholder="Nhập vào số điện thoại!"
            />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Email:">
          {getFieldDecorator('email', {
            initialValue: formData.email,
            rules: [
              {
                required: true,
                message: 'Nhập vào email của bạn!'
              }
            ]
          })(
            <Input
              style={{ width: '100%' }}
              placeholder="Nhập vào mail của bạn!"
            />
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="Địa chỉ:">
          {getFieldDecorator('address', {
            initialValue: formData.address,
            rules: [
              {
                required: true,
                message: 'Nhập vào địa chỉ!'
              }
            ]
          })(
            <Input style={{ width: '100%' }} placeholder="Nhập vào địa chỉ!" />
          )}
        </Form.Item>

        <Form.Item label="Hiệu lực CODE:" hasFeedback>
          {getFieldDecorator('codeDurationTime', {
            initialValue: formData.codeDurationTime,
            rules: [
              { required: true, message: 'Vui lòng chọn thời gian hiệu lực!' }
            ]
          })(
            <Select
              style={{ width: '100%' }}
              onChange={value => handleChangeDurationTime(value)}
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

const EditUserModal = Form.create({ name: 'edit_user_form' })(EditUserForm);

const actionCreators = {
  notify_success: notifyActions.success,
  notify_failure: notifyActions.failure
};

export default connect(null, actionCreators)(EditUserModal);
