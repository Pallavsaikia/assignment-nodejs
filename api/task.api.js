const express = require('express');
const router = express.Router();
const ProjectSchema = require('../models/project')
const TaskSchema = require('../models/task')
const errorResponse = require('../helper/response_wrapper/error_res')
const successResponse = require('../helper/response_wrapper/success_res')
const server_code = require('../helper/server_code')
const isStringEmpty = require('../helper/isStringEmpty')

router.get('/', async (req, res, next) => {

    const page = (req.body.page || 1);
    const size = 5;
    const skip = size * (page - 1);
    let totalPage = 0;

    const query = {};
    const sort = { createdAt: -1 }
    if (req.body.name) { query['name'] = req.body.name }
    if (req.body.status) { query['status'] = req.body.status }
    if (req.body.priority) { query['priority'] = req.body.priority }
    if (req.body.projectid) { query['project'] = req.body.projectid }
    if (req.body.sort === 'asc') { sort['createdAt'] = 1 }
    console.log(query)
    try {
        const [task, totalCount] = await Promise.all([TaskSchema.find(query).populate('project', { '_id': 1, 'name': 1, 'status': 1 }).sort(sort).limit(size).skip(skip).lean(),
        TaskSchema.find(query).count()
        ])

        if (totalCount) {
            console.log(totalCount)
            totalPage = Math.ceil(totalCount / size)
        }
        return new successResponse(res, { totalpage: totalPage, currentpage: page, task: task }, "fetched")
    } catch (err) {
        return next(new Error(err.message));
    }
})


router.post('/', async (req, res, next) => {

    if (isStringEmpty(req.body.name) || isStringEmpty(req.body.status) || isStringEmpty(req.body.projectid)) {
        return new errorResponse(res, 'Fields cant be empty', server_code._500)
    }
    try {
        console.log(req.body.projectid)
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