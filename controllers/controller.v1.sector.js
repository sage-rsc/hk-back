/**
 * Slantapp code and properties {www.slantapp.io}
 */
import Async from './../core/core.async.js'
import {ErrorClass, Utils} from "../core/index.js";
import {ModelSector} from "../models/index.js";

export const Sectors = Async(async (req, res, next) => {
    try {
        const sectors = await ModelSector.findAll();
        res.json(Utils.PrintRest("Sectors fetched successfully", true, sectors))
    } catch (e) {
        throw new ErrorClass(e.message, 500)
    }
})
