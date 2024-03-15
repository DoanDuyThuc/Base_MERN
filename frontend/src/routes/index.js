import HomePage from "../pages/HomePage/HomePage"
import InfoPage from "../pages/InfoPage/InfoPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import RegisterPage from "../pages/RegisterPage/RegisterPage"

export const routes = 
[
    {
        path: '/',
        page: HomePage,
        isHeaderFooter: true
    },
    {
        path: '/login',
        page: LoginPage,
        isHeaderFooter: false
    },
    {
        path: '/register',
        page: RegisterPage,
        isHeaderFooter: false
    },
    {
        path: '/info',
        page: InfoPage,
        isHeaderFooter: true
    },
]