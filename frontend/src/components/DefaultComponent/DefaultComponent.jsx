import FooterComponent from "../FooterComponent/FooterComponent";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import {Layout} from 'antd';



function DefaultComponent({children}) {

    return (
      <Layout>
          <HeaderComponent/>
            {children}
          <FooterComponent/>
      </Layout>
    );
  }
  
  export default DefaultComponent;
  