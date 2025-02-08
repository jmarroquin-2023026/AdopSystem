import { Router } from "express";
import { addUser, deleteUser, listUserById, listUsers, updatePassword, updateUser } from "./user.controller.js";
import { validateJwt } from "../../middlewares/validate.jw.js";
import { updateUserValidator } from "../../middlewares/validator.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";
import { registerVAlidator } from "../../middlewares/validator.js";
const api = Router();

api.post('/addUser',
        [uploadProfilePicture.single("profilePicture"),
        //Validador de errores
        registerVAlidator,deleteFileOnError],addUser)  
api.get('/getUser',validateJwt,listUsers);
api.get('/getUser/:id',validateJwt, listUserById);
api.put('/updateUser/:id',[validateJwt,updateUserValidator],updateUser);
api.delete('/deleteUser/:id',validateJwt, deleteUser);
api.put('/updatePasswor/:id',validateJwt,updatePassword)
export default api