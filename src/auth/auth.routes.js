//Rutas de autentificación

import { Router } from "express";
import {
        login,
        register,
        test} from './auth.controller.js'
import { validateJwt } from "../../middlewares/validate.jw.js";
import { registerVAlidator } from "../../middlewares/validator.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";

const api= Router()

//Rutas públicas
api.post('/register',
        [uploadProfilePicture.single("profilePicture"),
        //Validador de errores
        registerVAlidator,deleteFileOnError],register)  
        //Ejecutasr la validacion de errors(delete.file.on.errors.js)
                                                                                                        
api.post('/login',login)

api.get('/test', validateJwt, test)
export default api