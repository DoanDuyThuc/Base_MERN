const UserService = require("../services/UserService");
const JwtService = require("../services/jwtService");
const bcrypt = require('bcrypt');

const createUser = async (req,res) => {
    try {
        //check test case
        const {name, email, password, confirmPassword, phone } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const ischeckEmail = emailRegex.test(email);

        if(!name || !email || !password || !confirmPassword || !phone ){
            return res.status(200).json({
                status: 'ERROR',
                massage: "input validate ERROR"
            })
        }else if(!ischeckEmail){
            return res.status(200).json({
                status: 'ERROR',
                massage: "email validate ERROR"
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status: 'ERROR',
                massage: "password validate uniqual"
            })
        }

        const resj = await UserService.createUser(req.body)
        return res.status(200).json(resj)
    } catch (error) {
        return res.status(404).json({
            massage: error
        })
    }
}

const loginUser = async (req,res) => {
    try {
        //check test case
        const { email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const ischeckEmail = emailRegex.test(email);

        if(!email || !password){
            return res.status(404).json({
                status: 'error',
                massage: "input validate error"
            })
        }else if(!ischeckEmail){
            return res.status(404).json({
                status: 'error',
                massage: "email validate error"
            })
        }

        const resj = await UserService.loginUser(req.body)
        const {refresh_token, ...newresj} = resj;
        res.cookie('refresh_token',refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'

        })
        return res.status(200).json(newresj)
    } catch (error) {
        return res.status(404).json({
            massage: error
        })
    }
}

const updateUser = async (req,res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        

        const resj = await UserService.updateUser(userId, data)
        return res.status(200).json(resj)
    } catch (error) {
        return res.status(404).json({
            massage: error
        })
    }
}

const deleteUser = async (req,res) => {
    try {
        const userId = req.params.id;
        // const token = req.headers

        if(!userId) {
            res.status(200).json({
                status: "err",
                massage: "không tồn tại id"
            })
        }
        
        const resj = await UserService.deleteUser(userId)
        return res.status(200).json(resj)
    } catch (error) {
        return res.status(404).json({
            massage: error
        })
    }
}

const getAllUser = async (req,res) => {
    try {
        
        const resj = await UserService.getAllUser()
        return res.status(200).json(resj)
    } catch (error) {
        return res.status(404).json({
            massage: error
        })
    }
}

const getDetailsUser = async (req,res) => {
    try {
        const userId = req.params.id
        if(!userId) {
            res.status(200).json({
                status: "err",
                massage: "không tìm thấy user"
            })
        }
        const resj = await UserService.getDetailsUser(userId)
        return res.status(200).json(resj)
    } catch (error) {
        return res.status(404).json({
            massage: error
        })
    }
}

const refreshToken = async (req,res) => {
    try {
        const token = req.cookies.refresh_token;
        if(!token) {
            res.status(200).json({
                status: "err",
                massage: "không tìm thấy token"
            })
        }
        const resj = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(resj)
    } catch (error) {
        return res.status(404).json({
            massage: error
        })
    }
}

const LogoutUser = async (req,res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            massage: 'đăng xuất thành công'
        })
    } catch (error) {
        return res.status(200).json({
            error
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    LogoutUser
}