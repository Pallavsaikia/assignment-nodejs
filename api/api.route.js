const express = require('express');
const app = express.Router();

const jwtauth=require('../middleware/jwt_check')

const login=require('./login.api')
const signup=require('./signup.api')
const passwordReset=require('./passwordreset.api')
const project=require('./project.api')
const task=require('./task.api')

app.use("/login",login)
app.use("/signup",signup)
app.use("/passwordreset",passwordReset)
app.use("/project",jwtauth,project)
app.use("/task",jwtauth,task)
module.exports=app