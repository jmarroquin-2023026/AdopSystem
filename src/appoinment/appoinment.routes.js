import { Router } from "express";
import { AddAppoinment } from "./appoinment.controller.js";

const api=Router();

api.post('/addApoinment', AddAppoinment)

export default api