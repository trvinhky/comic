import { Button, Checkbox, Form, Input, Modal } from 'antd'
import Center from '~/components/center';
import './index.scss'
import { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { user } from '~/store/AppContext';
import useAppContext from '~/store/useAppContext';
import { useNavigate } from 'react-router';

const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { setUser } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Đăng Nhập'
    }, [])

    const onFinish = (values: any) => {
        let user: user | null = null
        if (values) {
            user = {
                userName: values.username,
                password: values.password
            }
        }

        if (user) setUser(user)
    }

    return (
        <Center>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h1 className='title'>Đăng Nhập</h1>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Nhớ tôi</Checkbox>
                    </Form.Item>

                    <span className="login-forgot" onClick={() => setIsModalOpen(true)}>Quên mật khẩu?</span>
                </Form.Item>

                <Form.Item>
                    <Center>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Đăng Nhập
                        </Button>
                    </Center>
                </Form.Item>
                Hoặc <span onClick={() => navigate('/register')} className='login-link'>Chưa có tài khoản đăng ký ngay!</span>
            </Form>
            <Modal
                title="Quên mật khẩu?"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Thoát"
            >
                <p>Hãy thư giãn và cố gắng nhớ lại mật khẩu của bạn :)).</p>
            </Modal>

        </Center>
    )
}

export default Login
