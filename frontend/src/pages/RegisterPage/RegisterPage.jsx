
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  LoadingOutlined
}
from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Spin, notification,Icon } from 'antd';
import Styles from './RegisterPage.module.css'
import {Link, useNavigate} from 'react-router-dom';
import { useMutation } from 'react-query';
import { RegisterService } from '../../Services/UserServices'
import { useEffect } from 'react';

function RegisterPage() {

  const navigator = useNavigate();

  const mutation = useMutation( async newData => {
    return await RegisterService(newData);
  })

  useEffect(() => {
    if(mutation.data?.status === 'OK'){
      notification.open({
        message: 'Thông tin',
        description: 'Đăng ký tài khoản thành công!',
        
      });

      navigator('/login')
    }else if(mutation.data?.status === 'ERROR'){
      notification.open({
        message: 'Thông tin',
        description: 'Đăng ký tài khoản không thành công!',
      });
    }
  },[mutation?.isSuccess, mutation?.isError])

  const onFinish = values => {
    mutation.mutate({
      name: values.userName,
      email: values.gmail,
      password: values.password,
      confirmPassword: values.confirm,
      phone : values.phone
    });
  };

  return (
    <div className={Styles.RegisterPage}>
      { mutation.isLoading ? (
        <Spin
          className={Styles.RegisterLoading}
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 50,
              }}/>
          }
        
        />
      ) : (
        <>
          {mutation.isError ? (
            <div>Có lỗi : {mutation.error.message}</div>
          ) : null}
        </>
      )}

          <Form
            name="normal_login"
            className={Styles.LoginForm}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >

            <Form.Item
              name="userName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên tài khoản!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />}/>

            </Form.Item>
            <Form.Item
              name="gmail"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập gmail của bạn!',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Gmail" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
            <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
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
                  return Promise.reject(new Error('mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="confirm"
              placeholder="ConfirmPassword"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'vui lòng nhập số điện thoại!',
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />}/>
          </Form.Item>

            <Form.Item style={{textAlign: 'center'}}>
              <Button type="primary" danger htmlType="submit" className={Styles.LoginBTN}>
                Đăng ký
              </Button>
            </Form.Item>  

            <Form.Item style={{textAlign: 'center'}}>
              <Button type="primary" className={Styles.LoginBTNregister}>
                {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                  
                <Link style={{padding: '7px 20px'}} to='/login' >
                  Đăng nhập ngay
                </Link>
              </Button>
            </Form.Item>
          </Form>
    </div>
  );
}

export default RegisterPage;
