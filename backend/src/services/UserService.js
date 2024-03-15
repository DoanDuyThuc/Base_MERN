const User = require('../models/UserModel')
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require('./jwtService');
const { get } = require('mongoose');

const createUser = (newUser) => {
    return new Promise( async (resole, reject) => {
        try {
            const {name, email, password, confirmPassword, phone } = newUser;

            //check email đã tồn tại chưa
            const checkEmail = await User.findOne({
                email: email
            })

            if(checkEmail !== null){
                resole({
                    status: "ERROR",
                    massage: "email already exist",
                    isSuccess: false
                })
            }

            //mã hóa mật khẩu
            const hash = bcrypt.hashSync(password, 10);

            const createUser = await User.create({
                name, 
                email, 
                password: hash, 
                phone 
            })

            if(createUser) {
                resole({
                    status: "OK",
                    massage: "create user succcess",
                    isSuccess: true,
                    data: createUser
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const loginUser = (userlogin) => {
    return new Promise( async (resole, reject) => {
        try {
            const { email, password } = userlogin;

            //check email đã tồn tại chưa
            const checkEmail = await User.findOne({
                email: email
            })

            if(checkEmail === null){
                resole({
                    status: "ERROR",
                    massage: "tài khoản hoặc mật khẩu không đúng",
                    isSuccess: false
                })
            }

            const comparePassword = bcrypt.compareSync(password, checkEmail.password);

            if(!comparePassword) {
                resole({
                    status: "ERROR",
                    massage: "mật khẩu kh đúng",
                    isSuccess: false
                })
            }

            const access_token = await genneralAccessToken({
                id: checkEmail.id,
                isAdmin: checkEmail.isAdmin,
            })

            const refresh_token = await genneralRefreshToken({
                id: checkEmail.id,
                isAdmin: checkEmail.isAdmin,
            })

            resole({
                status: "OK",
                massage: "đăng nhập thành công",
                isSuccess: true,
                access_token,
                refresh_token
            })

            
        } catch (error) {
            reject(error)
        }
    })
}

const updateUser = (userId, data) => {
    return new Promise( async (resole, reject) => {
        try {
            
            const checkUserId = await User.findById({
                _id: userId
            })

            // console.log("checkUserId: " , checkUserId);
            if(checkUserId === null) {
                resole({
                    status: "ERORR",
                    massage: "không tồn tại user này"
                })
            }

            const update_User = await User.findByIdAndUpdate(userId, data, { new: true });

            resole({
                status: "OK",
                massage: "update user thành công",
                data: update_User
            })

            
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUser = (userId) => {
    return new Promise( async (resole, reject) => {
        try {
            
            const checkUserId = await User.findById({
                _id: userId
            })

            if(checkUserId === null) {
                resole({
                    status: "ERORR",
                    massage: "không tồn tại user này"
                })
            }

            const update_User = await User.findByIdAndDelete(userId, { new: true });

            resole({
                status: "OK",
                massage: "delete thành công",
                data: update_User 
            })

            
        } catch (error) {
            reject(error)
        }
    })
}

const getAllUser = (userId) => {
    return new Promise( async (resole, reject) => {
        try {
            
            const getAll = await User.find();

            resole({
                status: "OK",
                massage: "tất cả user",
                data: getAll
            })

            
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailsUser = (userId) => {
    return new Promise( async (resole, reject) => {
        try {
            
            const getdetails = await User.findById(userId);

            if(getAllUser === null){
                res.status(200).json({
                    status: "err",
                    massage: "không user này"
                })
            }

            resole({
                status: "OK",
                massage: "chi tiết user",
                data: getdetails
            })

            
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}