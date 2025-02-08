import { Router } from "express";
import { AddAppoinment } from "./appoinment.controller.js";
import { validateJwt } from "../../middlewares/validate.jw.js";

const api=Router();

api.post('/addApoinment',validateJwt, AddAppoinment)

export default api