import express from 'express';
import {Sectors} from "../../controllers/controller.v1.sector.js";


let router = express.Router();
/* GET users listing. */
router.get('/',  Sectors);

export default router
