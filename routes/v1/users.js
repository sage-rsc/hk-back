import express from 'express';

//libraries
import {Add, Get} from "../../controllers/controller.v1.user.js";

let router = express.Router();
/* GET users listing. */
router.get('/:uid', Get);

router.post("/add", Add)
export default router
