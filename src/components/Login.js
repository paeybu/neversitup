import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd';
import axios from 'axios';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token'));
  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        'https://candidate.neversitup.com/todo/users/auth',
        values
      );
      if (res) {
        const { token } = res.data;
        localStorage.setItem('token', token);
        message.success('Logged in');
        setIsLogin(true);
      }
    } catch (error) {
      message.error('Wrong credential');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return isLogin ? (
    <Redirect to='/' />
  ) : (
    <Row justify='center' style={{ marginTop: '50px' }}>
      <Col span={12}>
        <Form
          {...layout}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
