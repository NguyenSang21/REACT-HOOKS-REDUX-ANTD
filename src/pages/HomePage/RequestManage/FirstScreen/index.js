import React, { forwardRef, useState, useImperativeHandle } from 'react';
import {
  Row,
  Col,
  Icon,
  DatePicker,
  Card,
  Form,
  Input,
  Radio,
  Select,
  InputNumber,
  Slider,
  Checkbox
} from 'antd';
import moment from 'moment';
import LocationInput from "../../../../components/Location";

const { Option } = Select;
const { Meta } = Card;
const dateFormat = 'DD/MM/YYYY';
const amountMarks = {
  0: '10 triệu',
  15: '15 triệu',
  20: {
    style: {
      color: '#f50'
    },
    label: <strong>20 triệu</strong>
  }
};
const durationMarks = {
  0: '1 tháng',
  5: '5 tháng',
  10: '10 tháng',
  12: {
    style: {
      color: '#f50'
    },
    label: <strong>12 tháng</strong>
  }
};

const BasicInfoForm = props => {
  const [gender, setGender] = useState('');
  // some config form
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  const onChangeGender = e => {
    setGender(e.target.value);
  };

  return (
    <>
      <Form.Item {...formItemLayout} label="Họ và tên">
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên của bạn!'
            }
          ]
        })(<Input placeholder="Vui lòng nhập tên của bạn" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Giới tính">
        {getFieldDecorator('gender', {
          initialValue: gender,
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn giới tính!'
            }
          ]
        })(
          <Radio.Group onChange={e => onChangeGender(e)}>
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Ngày sinh">
        {getFieldDecorator('birthday', {
          initialValue: moment(new Date(), dateFormat),
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn ngày sinh!'
            }
          ]
        })(<DatePicker format={dateFormat} />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Tỉnh/Thành phố">
        {getFieldDecorator('province', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: 'Tỉnh/Thành phố!'
            }
          ]
        })(<LocationInput placeholder="Nhập tỉnh thành phố" sourceName="Provinces" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Quốc tịch">
        {getFieldDecorator('nationality', {
          initialValue: 'vietnamese',
          rules: [
            {
              required: true,
              message: 'Tỉnh/Thành phố!'
            }
          ]
        })(
          <Select>
            <Option value="vietnamese">Việt Nam</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Số CMND/CCCD">
        {getFieldDecorator('cmnd', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập số CMND/CCCD'
            }
          ]
        })(<InputNumber style={{ width: '100%' }} />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Ngày cấp">
        {getFieldDecorator('birthday', {
          initialValue: moment(new Date(), dateFormat),
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn ngày cấp!'
            }
          ]
        })(<DatePicker format={dateFormat} />)}
      </Form.Item>
    </>
  );
};

const AmountInfoForm = props => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  const { getFieldDecorator } = props.form;

  return (
    <>
      <h4>Nhập khoảng vay bạn cần</h4>
      <Form.Item {...formItemLayout}>
        {getFieldDecorator('amount', {
          initialValue: 15,
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên của bạn!'
            }
          ]
        })(<Slider max={20} marks={amountMarks} />)}
      </Form.Item>
      <h4>Thời hạn bạn muốn vay</h4>
      <Form.Item {...formItemLayout}>
        {getFieldDecorator('duration', {
          initialValue: 5,
          rules: [
            {
              required: true,
              message: 'Thời hạn bạn muốn vay!'
            }
          ]
        })(<Slider max={12} marks={durationMarks} />)}
      </Form.Item>
      <h4>Khoảng trả hàng tháng (dự tính)</h4>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#ff5500', fontWeight: 700, fontSize: 30 }}>
          1.000.000
        </h1>
        <p>* Một số lưu ý</p>
        <p style={{ color: 'red' }}>
          Kết quả tính toán này chỉnh mang tính chất tham khảo và có thể sai
          lệch so với kết quả tính toán thực tế dự theo hồ sơ tính dụng cá nhân
          của riêng bạn.
        </p>
      </div>
    </>
  );
};

const ConfirmInfoForm = props => {
  const [isCommit, setCommit] = useState(false);
  const [isAgreePolicy, setAgreePolicy] = useState(false);

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <>
      <Form.Item {...formItemLayout} label="Địa chỉ email">
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'Vui lòng nhập E-mail!'
            },
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ email!'
            }
          ]
        })(<InputNumber style={{ width: '100%' }} />)}
      </Form.Item>
      <Form.Item label="Số điện thoại">
        {getFieldDecorator('phoneNumber', {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại!'
            }
          ]
        })(<Input style={{ width: '100%' }} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('isCommit', {
          initialValue: isCommit,
          rules: [
            {
              required: true,
              message: 'Vui lòng xác nhận các cam kết!'
            }
          ]
        })(
          <Checkbox onChange={() => setCommit(true)}>
            Tôi cam kết những thông tin trên là hoàn toàn chính xác.
          </Checkbox>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('isAgreePolicy', {
          initialValue: isAgreePolicy,
          rules: [
            {
              required: true,
              message: 'Vui lòng xác nhận chính xác về bảo mật!'
            }
          ]
        })(
          <Checkbox onChange={() => setAgreePolicy(true)}>
            Tôi đồng ý với quy định về bảo mật thông tin của công ty.
          </Checkbox>
        )}
      </Form.Item>
      <pre style={{ color: 'red' }}>
        * Vui lòng kiểm tra một lần nữa các thông tin để đảm bào tính chính xác.
      </pre>
      <pre style={{ color: 'red' }}>
        Sau khi xác nhận tiếp tục bạn sẽ không thể thay đổi thông tin đã cung
        cấp tại trang này.
      </pre>
    </>
  );
};

const FirstScreenForm = forwardRef((props, ref) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          return values;
        }
        return false;
      });
    }
  }));

  return (
    <>
      <div className="header-screen">
        <h1 style={{ fontSize: 20, color: '#1890ff' }}>
          THÔNG TIN SƠ LƯỢC VỀ BẠN
        </h1>
        <pre>
          Chào bạn, vui lòng hãy cung cấp một số thông tin cơ bản để EASY CREDIT
          có thể xác thực
        </pre>
        <pre>hồ sơ của bạn một cách nhanh chóng và chính xác nhất.</pre>
      </div>
      <div className="content-first-screen">
        <Form {...formItemLayout}>
          <Row gutter={16}>
            <Col span={14}>
              <Card>
                <Meta
                  avatar={<Icon type="user" />}
                  title="Thông tin cơ bản"
                  description={<BasicInfoForm {...props} />}
                />
              </Card>
              <Card>
                <Meta
                  avatar={<Icon type="user" />}
                  title="Thông tin liên lạc"
                  description={<ConfirmInfoForm {...props} />}
                />
              </Card>
            </Col>
            <Col span={10}>
              <Card>
                <AmountInfoForm {...props} />
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
});

const FirstScreen = Form.create({ name: 'first-screen-form' })(FirstScreenForm);

export default FirstScreen;
