/**
 * Slantapp code and properties {www.slantapp.io}
 */
import HttpCodes from './../core/HttpCodes.js';
import express from 'express';
import {ErrorClass, Utils} from "../core/index.js";
import {MiddlewareApiGuard} from './../middleware/middleware.v1.guard.js'

const router = express.Router();
//import routes belongs to v1
import UserRoute from './v1/users.js'
import SectorRoute from './v1/sectors.js'
//version 1.0 routes
/**
 * Start routing on v1
 */
router.get('/', (req, res, next) => {
    res.json(Utils.PrintRest("Api v1.0 checked. user documentation for next route", true, null));
})
//add each v1 modules api
router.use('/user', UserRoute);
router.use('/sector', SectorRoute);
//default error for user routes
router.use('*', (req, res, next) => {
    throw new ErrorClass("path '" + req.path + "' not associated with route v1.0 with " + req.method + " method, check docs and try again", HttpCodes.NotFound.code)
})
export default router
