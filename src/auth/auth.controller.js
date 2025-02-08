//Gestionar lógica de autentificación
import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const test=(req,res)=>{
    console.log('Text is running')
    res.send({message: 'Text is running'})
}
//Register
export const register=async(req,res)=>{
    try{
        //Capturar los datos
        let data = req.body
        //Crear elobjeto del modelo agregandole los datos capturados
        let user = new User(data)
        //Encriptar la password(2)
        user.password = await encrypt(user.password)
        //Asignar rol por defecto
        user.role = 'CLIENT'
        //asignar   
        //Guardar
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered succesfully, can be logged with username: ${user.username}`})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error with user registration'})
    }
}

//Login
export const login = async(req,res)=>{
    try{
        //Capturar los datos (body)
        let {userLogin,password}= req.body
        //Validar que el usuario exista
        let user = await User.findOne({
            $or:[  //Subfuncino OR| espera un [] de busquedas
                {email: userLogin},
                {username: userLogin}    
            ]        
        })
        //(username) = ({username: username})

        //Verificar que la contraseña coincida
        if(user && await checkPassword(user.password,password)){

            //MÁS ADELANTE: Generar el token
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message:`Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
            
        //Responder al usuario
            return res.status(400).send({message: 'Invalid Credentials'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error with login funtion',e})
    }   
}