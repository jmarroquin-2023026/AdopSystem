//Gestionar las imagenes
import multer,{diskStorage} from "multer";
import {dirname, extname,join} from 'path'
import { fileURLToPath } from "url";


const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const MIMETYPES = ["image/jpeg", "image/png", "image/jpg"]
const MAX_SIZE = 10000000//Bytes

const multerConfig = (destinationPath)=>{
    return multer(
        {
            storage:diskStorage(
                {
                    destination:(req,file,cb)=>{//DONDE GUARDAR
                        const fullPath=join(CURRENT_DIR, destinationPath)
                        req.filePath=fullPath
                        cb(null,fullPath)
                    },
                    filename:(req,file,cb)=>{//CON QUE NOMBRE
                        const fileExtension= extname(file.originalname)
                        const fileName = file.originalname.split(fileExtension)[0]
                        cb(null,`${fileName}-${Date.now()}${fileExtension}`)
                    }   
                }
            ),
            fileFilter:(req,file,cb)=>{//VALIDACIONES DE EXTENSIÓN
                if(MIMETYPES.includes(file.mimetype))cb(null,true)
                else cb(new Error(`Only ${MIMETYPES.join(" ")} are allowed`))
            },
            limits:{//TAMAÑO MÁXIMO   
                fileSize: MAX_SIZE
            }
        }
    )
}

export const uploadProfilePicture=multerConfig('../uploads/img/users')
