

import { Form, Input } from 'antd';
import Styles from './InfoPage.module.css'
import { useSelector } from 'react-redux';

function InfoPage() {

  const user = useSelector((state) => state.user);

  return (
    <div className={Styles.InfoPage}>
       <h2 style={{textAlign: 'center'}}>
        Thông tin tài khoản
       </h2>
        <Form className={Styles.InfoContent}>
            <Form.Item className={Styles.InfoItem}>
                <label>Gmail : </label>
                <Input value={user.email}/>
            </Form.Item>
            <Form.Item className={Styles.InfoItem}>
                <label>Name : </label>
                <Input value={user.name}/>
            </Form.Item>
            <Form.Item className={Styles.InfoItem}>
                <label>Phone : </label>
                <Input value={user.phone}/>
            </Form.Item>
            <Form.Item className={Styles.InfoItem}>
                <label value={user.avartar}>Avartar : </label>
                <Input/>
            </Form.Item>
        </Form>
    </div>
  );
}

export default InfoPage;
