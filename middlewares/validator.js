//Validar campos en las rutas
import { body } from "express-validator";
import { validateErrors, validateErrorsWithoutFile } from "./validated.errors.js";
import { existUsername,existEmail, notRequiredField } from "../utils/db.validators.js";

//Areglo de validaciones (por cada ruta)
export const registerVAlidator=[
    body('name','Name cannot be empty').notEmpty(),
    body('surname','Surname cannot be empty').notEmpty(),
    body('email','Email cannot be empty').notEmpty().isEmail().custom(existEmail),
    body('username','Username cannot be empty').notEmpty().toLowerCase().custom(existUsername),
    body('password','Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be strong').isLength({min:8}),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrors

]

export const updateUserValidator =[
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username,{req})=>existUsername(username,req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=>existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('profilePicture')
    .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
    .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFile //Luego se modificara
]