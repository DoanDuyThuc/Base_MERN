import axios from 'axios';

export const axiosJWT = axios.create();

export const RegisterService = async (data) => {
    const response = await axios.post('/api/user/sign-up', data);
    return response.data;
}

export const LoginService = async (data) => {
    const response = await axios.post('/api/user/sign-in', data);
    return response.data;
}

export const GetDetailsService = async (id,token) => {
    const response = await axiosJWT.get(`/api/user/get-details/${id}`,{
        headers:{
            token : `Bearer ${token}`
        }
    });
    return response.data;
}

export const RefreshTokenService = async () => {
    const response = await axios.post('/api/user/refresh-token', {
        // có cookie thì tự lấy
        withCredentials: true
    });
    return response.data;
}

export const LogoutService = async () => {
    const response = await axios.post('/api/user/log-out');
    return response.data;
}