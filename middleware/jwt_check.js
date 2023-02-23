const UserSchema = require("../models//user");
const jwt = require('jsonwebtoken');
const errorresponse = require('../helper/response_wrapper/error_res')
const status_code = require('../helper/server_code')

module.exports = function (req, res, next) {
    const token = req.headers['authorization']
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, token_dict) => {
        if (err) {
            return new errorresponse(res, "Invalid Token", status_code._401)
        } else {
            try {

                if (user) {
                    res.locals.user = token_dict.id;
                    next();
                } else {
                    return new errorresponse(res, "Invalid Token", status_code._401)
                }
            } catch (e) {
                return new errorresponse(res, "Invalid Token", status_code._401)
            }

        }
    })

}