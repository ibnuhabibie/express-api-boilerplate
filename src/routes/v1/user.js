const express = require('express')

const router = express.Router()

/**
 * 
 * @api {method} /path title
 * @apiName apiName
 * @apiGroup group
 * @apiVersion  0.0.1
 * 
 * 
 * @apiParam  {String} paramName description
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     property : value
 * }
 * 
 * 
 */

router.get('/', (req, res) => res.send('This sould return all users'))

module.exports = router
