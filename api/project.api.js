const express = require('express');
const router = express.Router();
const ProjectSchema = require('../models/project')
const errorResponse = require('../helper/response_wrapper/error_res')
const successResponse = require('../helper/response_wrapper/success_res')
const server_code = require('../helper/server_code')
const isStringEmpty = require('../helper/isStringEmpty')


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