const express = require('express');
const router = express.Router();
const UserSchema = require('../models/user')
const errorResponse = require('../helper/response_wrapper/error_res')
const successResponse = require('../helper/response_wrapper/success_res')
const server_code = require('../helper/server_code')
const isStringEmpty = require('../helper/isStringEmpty')
const jwt=require('jsonwebtoken');

router.post('/', async (req, res, next) => {

    if (isStringEmpty(req.body.loginid) || isStringEmpty(req.body.password)) {
        return new errorResponse(res, 'Fields cant be empty', server_code._500)
    }
    try {
        const user = await UserSchema.findOne({ $or: [{ 'email': req.body.loginid }, { 'phone': req.body.loginid }] }).exec()
        const valid = await user.validatePassword(req.body.password)
        if (valid) {
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY)
            return new successResponse(res, { accesstoken: token }, "logged in")
        } else {
            return new errorResponse(res, 'invalid credentials', server_code._500)
        }

    } catch (err) {
        return next(new Error(err.message));
    }
});



module.exports = router