import React, { useState, useRef } from 'react';
import { Steps, Card, Button, message } from 'antd';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';

const { Step } = Steps;

const RequestManage = props => {
  const [current, setCurrent] = useState(0);
  const childRef = useRef();
  const steps = [
    {
      title: 'Thông tin cơ bản',
      content: <FirstScreen wrappedComponentRef={childRef} />,
      description: 'Những thông tin sơ lược về bạn.'
    },
    {
      title: 'Thông tin cá nhân',
      content: <SecondScreen />,
      description: 'Cung cấp chi tiết thông tin cá nhân.'
    },
    {
      title: 'Thông tin thu nhâp',
      content: 'Last-content',
      description: 'You can hover on the dot.'
    },
    {
      title: 'Thông tin bổ sung',
      content: 'Last-content',
      description: 'You can hover on the dot.'
    }
  ];

  const nextStep = () => {
    // const value = childRef.current.handleSubmit()
    // if(value) {
    //   setCurrent(current + 1);
    // }

    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

  return (
    <Card style={{ margin: ' 10px 10px' }}>
      <Steps current={current}>
        {steps.map(item => {
          return (
            <Step
              key={item.title}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => nextStep()}>
            Tiếp tục
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Đăng ký
          </Button>
        )}
        {current > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={() => prevStep()}>
            Quay lại
          </Button>
        )}
      </div>
    </Card>
  );
};

export default RequestManage;
