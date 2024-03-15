const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

//tạo ra token
const genneralAccessToken = (payload) => {
    const access_token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '1h'})

    return access_token
}

//LÀM MỚI TOKEN
const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})

    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise( async (resole, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err,user)=> {

                if(err){
                    resole({
                        status: "OK",
                        massage: "the authtication"
                    })
                }

                const {payload} =user;

                const access_token = await genneralAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                });

                resole({
                    status: "OK",
                    massage: "SUSSCES",
                    access_token
                })
            })
            
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}