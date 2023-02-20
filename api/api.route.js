const express = require('express');
const app = express.Router();
const login=require('./login.api')
const signup=require('./signup.api')
const passwordReset=require('./passwordreset.api')

app.use("/login",login)
app.use("/signup",signup)
app.use("/passwordreset",passwordReset)

module.exports=app