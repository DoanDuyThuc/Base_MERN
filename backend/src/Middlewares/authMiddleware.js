const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err){
            return res.status(200).json({
                status: "err",
                massage: "the authemtication"
            })
        }
        const { payload} = user;
        if(payload?.isAdmin){
            next();
        }else {
            return res.status(200).json({
                status: "err",
                massage: "the authemtication"
            })
        }
        
      });
}

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if(err){
            return res.status(200).json({
                status: "err",
                massage: "the authemtication"
            })
        }
        const { payload} = user;
        if(payload?.isAdmin || payload?.id === userId){
            next();
        }else {
            return res.status(200).json({
                status: "err",
                massage: "the authemtication"
            })
        }
        
      });
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}