const mongoose = require('mongoose')
const status = require('../helper/status')
const projectschema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: status,
            required: true,
        }
    },
    {
        timestamps: true

    }
);

module.exports = mongoose.model('project_schema', projectschema);