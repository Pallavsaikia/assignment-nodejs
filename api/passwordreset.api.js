const express = require('express');
const router = express.Router();
const errorResponse = require('../helper/response_wrapper/error_res')
const successResponse = require('../helper/response_wrapper/success_res')
const UserSchema = require('../models/user')
const jwt = require('jsonwebtoken');

router.get('/:jwt', async (req, res, next) => {

    jwt.verify(req.params.jwt, process.env.JWT_SECRET_KEY, async (err, token_dict) => {
        if (err) {
            res.send('  Invalid Token ')
        } else {
            console.log(token_dict)
            console.log(token_dict._id)
            if (!token_dict.expiry) {
                return res.send('  Invalid Token ')
            }
            if (token_dict.expiry < new Date().getTime()) {
                return res.send('  Token expired ')
            }
            try {
                const user = await UserSchema.findOne({ _id: token_dict._id }).lean()
                if (user) {
                    return res.send('  <form method ="post" action=""><input type="text" name="password"><input type="submit" value="reset-password"></input</form> ')
                } else {
                    res.send('  Invalid Token ')
                }
            } catch (e) {
                res.send('  Invalid Token ')
            }


        }
    })

});
router.post('/:jwt', async (req, res, next) => {
    jwt.verify(req.params.jwt, process.env.JWT_SECRET_KEY, async (err, token_dict) => {
        if (err) {
            res.send('  Invalid Token ')
        } else {
            console.log(token_dict)
            console.log(token_dict._id)
            if (!token_dict.expiry) {
                return res.send('  Invalid Token ')
            }
            if (token_dict.expiry < new Date().getTime()) {
                return res.send('  Token expired ')
            }
            try {
                const user = await UserSchema.findOne({ _id: token_dict._id }).exec()
                if (user) {
                    user.password=req.body.password
                    user.verified=true
                    await user.save()
                    res.send('  Password updated ')
                } else {
                    res.send('  Invalid Token ')
                }
            } catch (e) {
                res.send('  Invalid Token ')
            }


        }
    })
})



module.exports = router