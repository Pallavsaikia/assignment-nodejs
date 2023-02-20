const mongoose = require('mongoose');
const bcrypt =require('bcrypt')
const gender = require('../helper/genders')
const SALT_WORK_FACTOR=10
const user = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            index: true
        },
        gender: {
            type: String,
            enum: gender,
            required: true
        },
        verified:{
            type:Boolean,
            default:false
        }
    },
    {
        // autoCreate: false,
        timestamps: true

    }
);
user.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
})

user.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};
module.exports = mongoose.model('user_schema', user);