
import {
  UserOutlined,
  LockOutlined,
  LoadingOutlined
}
from '@ant-design/icons';
import { Button, Form, Input, Spin, notification } from 'antd';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import Styles from './LoginPage.module.css'
import {Link, useNavigate} from 'react-router-dom';
import { GetDetailsService, LoginService } from '../../Services/UserServices';
import { useEffect } from 'react';
import { updateUserLogin } from '../../redux/slider/userSlice';

function LoginPage() {

  const navigator = useNavigate();
  const dispatch = useDispatch();
  
  const mutation = useMutation( async data => {
    return LoginService(data);
  })

  
  useEffect(() => {
    if(mutation.isSuccess) {
      if(mutation.data?.status === 'OK'){
        navigator('/');
        notification.open({
          message: 'Thông tin',
          description: 'Đăng nhập thành công!',
        });
        localStorage.setItem('accsetToken', JSON.stringify(mutation.data?.access_token));
        if(mutation.data?.access_token){
          const decoded = jwtDecode(mutation.data?.access_token);
          if(decoded.payload?.id){
            handleGetDetailsUser(decoded.payload?.id, mutation.data?.access_token);
          }
          
        }
      }

      if(mutation.data?.status === 'ERROR'){
        notification.open({
          message: 'Thông tin',
          description: 'Đăng nhập không thành công!',
          
        });
      }
    }
  },[mutation?.isSuccess])

  const handleGetDetailsUser = async(id, token) => {
    const response = await GetDetailsService(id, token);
    dispatch(updateUserLogin({...response?.data, token}))
  }

  const onFinish = async values => {
    mutation.mutate({
      email: values.email,
      password: values.password
    })
  };

  // console.log(mutation);

  return (
    <div className={Styles.LoginPage}>
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
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập gmail của bạn!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Gmail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập password của bạn!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item style={{textAlign: 'center'}}>
          <Button type="primary"  danger  htmlType="submit" className={Styles.LoginBTN}>
            Đăng nhập
          </Button>
        </Form.Item>  

        <Form.Item style={{textAlign: 'center'}}>
          <Button type="primary" className={Styles.LoginBTNregister}>
            <Link style={{padding: '7px 29px'}} to='/register' >
              Đăng ký ngay
            </Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
