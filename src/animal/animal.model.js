import {Schema, model} from 'mongoose'

const animalSchema = Schema( 
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [10, `Can't be overcome 10 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [100, `Can't be overcome 100 characters`]
        },
        age: {
            type: String,
            required: [true, 'Age is required'],
            maxLength: [10, `Can't be overcome 10 characters`]
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        keeper: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required:[true, 'Keeper ID is required']
        }
    }
);

export default model('Animal', animalSchema); 
