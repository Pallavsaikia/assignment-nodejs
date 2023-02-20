const express = require('express');
const router = express.Router();
const ProjectSchema = require('../models/project')
const TaskSchema = require('../models/task')
const errorResponse = require('../helper/response_wrapper/error_res')
const successResponse = require('../helper/response_wrapper/success_res')
const server_code = require('../helper/server_code')
const isStringEmpty = require('../helper/isStringEmpty')


router.post('/', async (req, res, next) => {

    if (isStringEmpty(req.body.name) || isStringEmpty(req.body.status) || isStringEmpty(req.body.projectid)) {
        return new errorResponse(res, 'Fields cant be empty', server_code._500)
    }
    try {
        console.log(req.body.projectid )
        const project = await ProjectSchema.findOne({ _id: req.body.projectid }).lean()
        if (project) {
            const task = await new TaskSchema({
                name: req.body.name,
                description: req.body.description,
                project: project,
                priority: req.body.priority,
                status: req.body.status
            }).save()
            return new successResponse(res, { task: task }, "Added")
        } else {
            return new errorResponse(res, 'project doesnot exist', server_code._500)
        }
    } catch (err) {
        return next(new Error(err.message));
    }
});



module.exports = router