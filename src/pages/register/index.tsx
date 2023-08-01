import { Button, Form, Input } from 'antd'
import Center from '~/components/center';
import './index.scss'
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Đăng Ký'
  }, [])

  const onFinish = (values: any) => {
    console.log('Success:', values);
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  return (
    <Center>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className='login-form'
      >
        <h1 className='title'>Đăng Ký</h1>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'Vui lòng nhập đúng định dạng!',
            },
            {
              required: true,
              message: 'Vui lòng nhập email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Nhập Lại Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lại mật khẩu!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng Ký
          </Button>
        </Form.Item>
        <span onClick={() => navigate('\login')} className='login-link'>Đã có tài khoản đăng nhập ngay.</span>
      </Form>
    </Center>
  )
}

export default Register
