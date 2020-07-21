import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form, Input, Card } from 'antd';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import styled from 'styled-components';

const CardWrapper = styled.div`
  padding-top: 20px;
`;

const Content = styled.div`
  width: 1400px;
  margin: 50px auto;
`;

const TodoHome = () => {
  const token = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${token || localStorage.getItem('token')}`,
    },
  };

  const [form] = Form.useForm();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const res = await axios.get(
      'https://candidate.neversitup.com/todo/todos',
      config
    );
    setTodos(res.data);
  };

  const CreateModal = () => (
    <Modal
      visible={showCreateModal}
      footer={null}
      onCancel={() => setShowCreateModal(false)}
    >
      <CardWrapper>
        <Form
          onFinish={async (values) => {
            try {
              await axios.post(
                'https://candidate.neversitup.com/todo/todos',
                values,
                config
              );
              setShowCreateModal(false);
              getTodos();
            } catch (error) {
              console.log(error);
            }
          }}
          layout='vertical'
        >
          <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[
              { required: true, message: 'Please input your description!' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </CardWrapper>
    </Modal>
  );
  const EditModal = () => (
    <Modal
      visible={showEditModal}
      footer={null}
      onCancel={() => setShowEditModal(false)}
    >
      <div className='pt-2'>
        <Form
          form={form}
          initialValues={todos.filter((todo) => todo._id === currentTodo)[0]}
          onFinish={async (values) => {
            try {
              const url = `https://candidate.neversitup.com/todo/todos/${currentTodo}`;
              await axios.put(url, values, config);
              setShowEditModal(false);
              getTodos();
            } catch (error) {
              console.log(error);
            }
          }}
          layout='vertical'
        >
          <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[
              { required: true, message: 'Please input your description!' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Update
            </Button>
            <Button
              type='danger'
              className='ml-1'
              onClick={async () => {
                const url = `https://candidate.neversitup.com/todo/todos/${currentTodo}`;
                await axios.delete(url, config);
                setShowEditModal(false);
                getTodos();
              }}
            >
              Delete
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );

  return (
    <>
      <Content>
        {todos.length === 0 ? (
          <>
            <p>You have no todos. Press 'Create' to add new todo</p>
            <Button type='primary' onClick={() => setShowCreateModal(true)}>
              Create
            </Button>
          </>
        ) : (
          <>
            {todos.map(({ _id, title, description }) => (
              <div
                className='mb-1'
                onClick={() => {
                  setCurrentTodo(_id);
                  setShowEditModal(true);
                  form.resetFields();
                }}
              >
                <Card title={title}>{description}</Card>
              </div>
            ))}
            <Button
              className='mt-1'
              onClick={() => setShowCreateModal(true)}
              type='primary'
            >
              Create
            </Button>
          </>
        )}
      </Content>
      <CreateModal />
      <EditModal />
    </>
  );
};

export default TodoHome;
