//Gestionar un perfil existente de usuario
import User from './user.model.js';
import argon from 'argon2'
import {encrypt } from '../../utils/encryp.js'
 
export const addUser=async(req,res)=>{
    try{
        //Capturar los datos
        let data = req.body
        //Crear elobjeto del modelo agregandole los datos capturados
        let user = new User(data)
        //Encriptar la password(2)
        user.password = await encrypt(user.password)
        //Asignar rol por defecto
        user.role = 'ADMIN'
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
    
//Listar
export const listUsers = async(req,res)=>{
    try{
        //Configuraciones de paginacion
        const {limit = 20,skip=0}= req.query
        //Consultar
        const users=await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length===0){
            return res.status(404).send(
                {
                    succes:false,
                    message: 'Users not found'

                })
        }
            return res.send(
                {   
                    succes:true,
                    message: 'Users found:', users, 
                    users
                })
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error',e})
    }
}

export const listUserById = async(req,res)=>{
    try{
        let { id }=req.params
        let user=await User.findById(id)
        if(!user){
            return res.status(404).send(
              {
                   succes:false,
                    message: 'User not found:' 
              }  
            )
           
        }
            return res.status(200).send(
                {
                    succes: true,
                    message: 'User found', 
                    user

                })
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                succes:false,
                message: 'General error',
                e
            })
    }
}

//Actualizar
export const updateUser = async(req,res)=>{
    try{
        const {id}=req.params
        const data=req.body
        const updatedUser= await User.findByIdAndUpdate(id,data,{new:true})
        if(!updatedUser) return res.status(404).send(
            {
                succes:false,
                message: 'User not found'
                
            }
        )
            return res.send({message: 'User updated succesfully', updatedUser})
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error',
                e
            }
        )
    }
}



export const updatePassword = async (req, res) => {
    try {
        let {id} = req.params;
        let {newPassword, oldPassword} = req.body;
        let user = await User.findById(id);
        if (!user) return res.status(404).send({ message: 'User not found:' });
        let compare = await argon.verify( user.password,oldPassword);
        if (!compare) return res.status(400).send({ message: 'Incorrect Password:' });
        user.password = await encrypt(newPassword);
        await user.save();

        return res.send({ message: 'Password updated succesfully:' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Internal Error server', e });
    }
};



export const deleteUser = async(req,res)=>{
    try{
        let {id}=req.params
        let deltedUser=await User.findByIdAndDelete(id)
        if(!deltedUser) return res.status(404).send({message: 'User not found'})
            return res.send({message: 'User deleted succesfully', deltedUser})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error',e})   
    }
}

