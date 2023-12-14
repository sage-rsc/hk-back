/**
 * Slantapp code and properties {www.slantapp.io}
 */
import Async from './../core/core.async.js'
import {ErrorClass, Utils} from "../core/index.js";
import {ModelUser} from "../models/index.js";

export const Add = Async(async (req, res, next) => {
    try {
        const user = await ModelUser.Add(req.body);
        res.json(Utils.PrintRest(`User ${user.created ? "added" : "updated"} successfully`, true, user))
    } catch (e) {
        throw new ErrorClass(e.message, 500)
    }
})

export const Get = Async(async (req, res, next) => {
    try {
        const {uid} = req.params
        console.log(uid)
        const user = await ModelUser.User(uid);
        res.json(Utils.PrintRest("User added successfully", true, user))
    } catch (e) {
        throw new ErrorClass(e.message, 500)
    }
})
