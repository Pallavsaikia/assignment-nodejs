const express = require('express');
const router = express.Router();
const ProjectSchema = require('../models/project')
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
    if (req.body.sort === 'asc') { sort['createdAt'] = 1 }

    try {
        const [project, totalCount] = await Promise.all([ProjectSchema.find(query).sort(sort).limit(size).skip(skip).lean(),
            ProjectSchema.find(query).count()
        ])
   
        if (totalCount) {
            console.log(totalCount)
            totalPage = Math.ceil(totalCount/ size)
        }
        return new successResponse(res, { totalpage: totalPage,currentpage:page, project: project }, "fetched")
    } catch (err) {
        return next(new Error(err.message));
    }
})




router.post('/', async (req, res, next) => {

    if (isStringEmpty(req.body.name) || isStringEmpty(req.body.status)) {
        return new errorResponse(res, 'Fields cant be empty', server_code._500)
    }
    try {
        const project = await new ProjectSchema({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status
        }).save()
        return new successResponse(res, { project: project }, "Added")
    } catch (err) {
        return next(new Error(err.message));
    }
});



module.exports = router