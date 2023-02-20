const express = require('express');
const router = express.Router();
const UserSchema = require('../models/user')
const errorResponse = require('../helper/response_wrapper/error_res')
const successResponse = require('../helper/response_wrapper/success_res')
const server_code = require('../helper/server_code')
const isStringEmpty = require('../helper/isStringEmpty')
const { validateEmail, validatePhone, validateGender } =require('../helper/regex')
const crypto = require("crypto");
const {dataToJWT,passwordRestDataModel}=require('../helper/data-to-jwt')
const { sendMail, mailOptions } = require('../helper/mailservice')

router.post('/', async (req, res, next) => {
    try {
        if (isStringEmpty(req.body.email)
            || isStringEmpty(req.body.phone)
            || isStringEmpty(req.body.name)
            || isStringEmpty(req.body.age)
            || isStringEmpty(req.body.gender)) {
            return new errorResponse(res, 'Fields cant be empty', server_code._500)
        }
        if(!validateEmail(req.body.email) || !validatePhone(req.body.phone) || !validateGender(req.body.gender)){
            return new errorResponse(res, 'Please Fill in appropriate details', server_code._500)
        }
        const user = await UserSchema.findOne({ $or: [{ 'email': req.body.email },{ 'phone': req.body.phone }] }).exec()
        passwordRandom=crypto.randomBytes(20).toString('hex')
        if (!user) {
            const newuser = await new UserSchema({
                name: req.body.name,
                email: req.body.email,
                password: passwordRandom,
                phone: req.body.phone,
                gender: req.body.gender,
            }).save()
            jwtdata=dataToJWT(passwordRestDataModel(newuser._id))
            const url='http://127.0.0.1:3000/api/passwordreset/'+jwtdata
            sendMail(mailOptions(to=req.body.email,subject='passwordreset',text='reset your mail in this link '+url))

            return new successResponse(res, {message:'check mail to reset password'}, "Created")
        } else {
            return new errorResponse(res, 'email or phone already in use', server_code._500)
        }
    } catch (err) {
        return next(new Error(err.message));
    }
});



module.exports = router