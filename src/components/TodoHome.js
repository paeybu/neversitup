import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form, Input, Card } from 'antd';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const TodoHome = () => {
  const token = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const config = {
    headers: { Authorization: `Bearer ${token}` },
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
      <div style={{ paddingTop: '20px' }}>
        <Form
          onFinish={async (values) => {
            try {
              const res = await axios.post(
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
      </div>
    </Modal>
  );
  const EditModal = () => (
    <Modal
      visible={showEditModal}
      footer={null}
      onCancel={() => setShowEditModal(false)}
    >
      <div style={{ paddingTop: '20px' }}>
        <Form
          form={form}
          initialValues={todos.filter((todo) => todo._id === currentTodo)[0]}
          onFinish={async (values) => {
            try {
              const url = `https://candidate.neversitup.com/todo/todos/${currentTodo}`;
              console.log(url);
              const res = await axios.put(url, values, config);
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
              style={{ marginLeft: '20px' }}
              onClick={async () => {
                const url = `https://candidate.neversitup.com/todo/todos/${currentTodo}`;
                const res = await axios.delete(url, config);
                console.log(res);
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
      <div style={{ width: '1400px', margin: '50px auto' }}>
        {todos.length === 0 ? (
          <>
            <p>You have no todos. Press 'Create' to add new todo</p>
            <Button onClick={() => setShowCreateModal(true)}>Create</Button>
          </>
        ) : (
          <>
            {todos.map(({ _id, title, description }) => (
              <div
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
              style={{ marginTop: '20px' }}
              onClick={() => setShowCreateModal(true)}
            >
              Create
            </Button>
          </>
        )}
      </div>
      <CreateModal />
      <EditModal />
    </>
  );
};

export default TodoHome;
