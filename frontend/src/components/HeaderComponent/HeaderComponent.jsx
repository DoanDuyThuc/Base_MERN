import {  Button, Layout, Menu, Popover} from 'antd';
import { useNavigate } from 'react-router-dom';

import Styles from './HeaderComponent.module.css'
import Search from 'antd/es/input/Search';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutService } from '../../Services/UserServices';
import { resetUserLogout } from '../../redux/slider/userSlice';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';

function HeaderComponent() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    await LogoutService();
    dispatch(resetUserLogout());
    localStorage.removeItem('accsetToken');
  }

  const content = (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{margin: '5px 0'}}>
        <Button onClick={() => navigate('/info')} style={{padding: '10px', cursor: 'pointer', fontWeight: '600', border: 'none'}}>Thông tin tài khoản</Button>
      </div>
      {user.isAdmin ? (
      <div style={{margin: '5px 0'}}>
        <Button style={{padding: '10px', cursor: 'pointer', fontWeight: '600', border: 'none'}}>Quản Lý</Button>
      </div>
      ): (
        ''
      )}
      <div style={{margin: '5px 0'}}>
        <Button onClick={handleLogout} style={{padding: '10px', cursor: 'pointer', fontWeight: '600', border: 'none'}}>Đăng xuất</Button>
      </div>
    </div>
  );

  const { Header} = Layout;

  const handleNavigateLogin = () => {
      navigate('/login')
  }


  return (
      <Header className={Styles.HeaderComponent}>
        <div className={Styles.HeaderLogo}>
          NAME PAGES
        </div>
        <div className={Styles.HeaderMenuContainer}>
          <div className={Styles.HeaderMenuMain}>
            <ul className={Styles.HeaderMenuList}>
              <li className={Styles.HeaderMenuItem}>
                <Button className={Styles.HeaderMenuItemBTN}>TITLE</Button>
              </li>
              <li className={Styles.HeaderMenuItem}>
                <Button className={Styles.HeaderMenuItemBTN}>TITLE</Button>
              </li>
            </ul>
          </div>
          
          <Search className={Styles.HeaderInputSearch} placeholder="Search" loading enterButton />
        </div>
        <div className={Styles.HeaderLogin}>
          {user?.name ? (
            <Popover placement="bottom"  content={content}>
              <Button className={Styles.HeaderInfo}>{user?.name}</Button>
            </Popover>
          ): (
            <Button onClick={handleNavigateLogin}>Đăng nhập</Button>
          )}
        </div>
      </Header>
  );
}

export default HeaderComponent;
