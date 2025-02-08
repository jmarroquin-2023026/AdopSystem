//Eliminar archivos si algo sale mal
import {unlink } from  'fs/promises' //Eliminar archivos
import {join} from 'path' //Unir carpetas o archivos a carpetas

//Middleware de eliminar
export const deleteFileOnError = async(error,req,res,next)=>{
    if(req.file && req.filePath){
                            //c://dev/adpsys/uploads/img/user nombrearchivo
        const filePath = join(req.filePath, req.file.filename)
        try{
            await unlink(filePath)
        }catch(unlinkE){
            console.error('Error deleting file', unlinkE)
        }
        if(error.status === 400 || error.errors )
            return res.status(400).send(
            {
                succes:false,
                message: 'Error registering user',
                error
            }
        )
    }
    return res.status(500).send(
        {
            succes:false,
            message: error.message
        }
    )
        
}