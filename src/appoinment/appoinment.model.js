import { Schema,model} from 'mongoose';


const appointmenSchema=Schema(
    {
        date:{
            type:Date,
            required:[true,'Name is required'],
            maxLength:[8,`Can't be overcome 8 characteres` ]
        },
        description:{
            type:String,
            required:[true,'Description is required'],
            maxLength:[20, `Can't be overcome 20 characteres`]
        },
        animal:{
            type:Schema.Types.ObjectId,
            ref:'Animal',
            required:[true, 'Animal ID is required']
        } ,
        keeper: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required:[true, 'Keeper ID is required']
        }

    }
);

export default model('Appointment',appointmenSchema);