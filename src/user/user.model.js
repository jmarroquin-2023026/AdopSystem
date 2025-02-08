import {Schema, model} from 'mongoose'

const userSchema=Schema(
    {
        name:{
            type: String,
            //Mongo VAlidation(middleware / intermediario que valida el parámetro antes de guardar)
            required:[true,'Name is required'],
            maxLenght:[25, `Can't be  overcome 25 characters`]

        },
        surname:{
            type: String,
            required:[true,'Surname is required'],
            maxLenght: [25, `Can't be  overcome 25 characters`]
        },
        username:{
          type: String,
          required:[true, 'User name is required'],
          unique:[true, 'Username is already taken'],//NO SE PUEDE DUPLICAR
          lowercase: true,
          maxLenght: [15, `Can't be  overcome 15 characters`]
        },
        email:{
            type:String,
            required:[true, 'Email is required'],
            //Si no es único
            unique: true
            //Validación personalizada
            //match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g] //Regex para vlaidar email
        },
        password:{
            type: String,
            require:[true, 'Password is required'],
            minLength:[8, 'Password must be 8 characteres'],
            maxLenght:[100, `Can't be overcome 16 characters`],
            //match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm]
        },
        profilePicture:{
            type:String
        },
        phone:{
            type: String,
            required:[true,'Phone is required'],
            minLength:[8, `Can't be  overcome 16 characters`],
            maxLenght:[15, 'Phone must be 13 numbers'],
            // match:[/^\+[0-9]{1,3} [0-9]{3,5}-[0-9]{4}$/]
        },
        role:{
            type:String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum:['ADMIN','CLIENT']
        }
    }
)

//Modificar el toJSON-> toObject para excluir datos en la respuesta
userSchema.methods.toJSON = function(){
    const {__v,password,...user}=this.toObject()//Siver para convertir un documento de MongoDB a un objeto de Js
    return user
}

//Crear y exportar el modelo

export default model('User',userSchema)