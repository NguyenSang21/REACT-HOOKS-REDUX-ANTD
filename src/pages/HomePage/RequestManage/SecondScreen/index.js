import React from 'react';
import { Card, Col, Form, Icon, Row, Input, } from 'antd';
import LocationInput from "../../../../components/Location";

const { Meta } = Card;
const BasicInfoForm = props => {
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <>
      <Form.Item {...formItemLayout} label="Tỉnh/Thành phố">
        {getFieldDecorator('province', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn Tỉnh/Thành phố!'
            }
          ]
        })(<LocationInput placeholder="Nhập tỉnh thành phố" sourceName="Provinces" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Quận/Huyện">
        {getFieldDecorator('district', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn Quận/Huyện!'
            }
          ]
        })(<LocationInput placeholder="Nhập quận/huyện" sourceName="Districts" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Phường/Xã">
        {getFieldDecorator('ward', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn Phường/Xã!'
            }
          ]
        })(<LocationInput placeholder="Nhập phường/xã" sourceName="Wards" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Địa chỉ">
        {getFieldDecorator('address', {
          initialValue: null,
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập vào địa chỉ!'
            }
          ]
        })(<Input placeholder="Nhập vào địa chỉ" />)}
      </Form.Item>
    </>
  );
};

const SecondScreenForm = props => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  return (
    <>
      <div className="header-screen">
        <h1 style={{ fontSize: 20, color: '#1890ff' }}>
          THÔNG TIN CÁ NHÂN CHI TIẾT
        </h1>
        <pre>
          Vui lòng cung cấp chi tiết thông tin cá nhân của bạn để chúng tôi đánh
          giá mức độ tin cậy của
        </pre>
        <pre>hồ sơ tính dụng.</pre>
      </div>
      <div className="content-first-screen">
        <Form {...formItemLayout}>
          <Row gutter={16}>
            <Col span={14}>
              <Card>
                <Meta
                  avatar={<Icon type="user" />}
                  title="Nơi ở hiện tại"
                  description={<BasicInfoForm {...props} />}
                />
              </Card>
            </Col>
            <Col span={10}>
              <Card>
                <div>TEST TEST SANG SANG</div>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

const SecondScreen = Form.create({ name: 'first-screen-form' })(
  SecondScreenForm
);

export default SecondScreen;
