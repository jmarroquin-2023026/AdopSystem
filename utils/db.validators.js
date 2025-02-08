//Validar dtos relacionados a la BD
import User from '../src/user/user.model.js'
                                //parametro |Token | id
export const existUsername = async(username,user,id)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && alreadyUsername._id !=user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email,user)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Username ${email} is already taken`)
        throw new Error(`Username ${email} is already taken`)
    }
}

export const notRequiredField=(field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}