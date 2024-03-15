import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment, useEffect } from 'react';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import { GetDetailsService, RefreshTokenService, axiosJWT} from './Services/UserServices';
import { useDispatch } from 'react-redux';
import { updateUserLogin } from './redux/slider/userSlice';

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const {decoded, storageData} = handleDecode();

    if(decoded.payload?.id){
      handleGetDetailsUser(decoded.payload?.isAdmin,decoded.payload?.id, storageData);
    }
    
  },[])

  const handleDecode = () => {
    let storageData = localStorage.getItem('accsetToken')
    let decoded = {}
    
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }

    return {storageData, decoded}
  }

  axiosJWT.interceptors.request.use(async function (config) {
    const date = new Date();
    
    const {decoded, storageData} = handleDecode();

    if(decoded?.exp < date.getTime() / 1000){
      const data = await RefreshTokenService();
      config.headers['token'] = `Bearer ${data?.access_token}`
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  const handleGetDetailsUser = async (isAdmin,id, token) => {
    const response = await GetDetailsService(id, token);
    dispatch(updateUserLogin({...response.data,isAdmin, token}))
  }


  return (
    <div>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const Page = route.page;
              const Layout = route.isHeaderFooter ? DefaultComponent : Fragment;
              return (
                <Route key={index} path={route.path} element={
                  <Layout>
                    <Page/>
                  </Layout>
                }/>
              )
            })}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
