const mongoose = require('mongoose')
const status = require('../helper/status')
const priority = require('../helper/priority')
const projectschema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        project:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project_schema',
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            enum: priority,
            required: true,
            default:priority.low
        },
        status: {
            type: String,
            enum: status,
            required: true
        },
    },
    {
        timestamps: true

    }
);

module.exports = mongoose.model('task_schema', projectschema);