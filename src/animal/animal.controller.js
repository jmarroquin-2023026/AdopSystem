import Animal from './animal.model.js';
import User from '../user/user.model.js'; 


//Agregar
export const addAnimal = async (req, res) => {
    try {
        let { keeper, ...data } = req.body;
        let user = await User.findById(keeper);
        if (!user) {
            return res.status(404).send({ message: 'Keeper not found' });
        }
        if (user.role !== 'ADMIN') {
            return res.status(403).send({ message: 'Keeper must be a ADMIN' });
        }
        let animal = new Animal({ ...data, keeper: user._id });
        await animal.save();
        return res.status(201).send({ message: 'Animal saved successfully', animal });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error saving animal', e });
    }
};

//Listar
export const getAnimal = async(req,res)=>{
    try{
        let animal=await Animal.find()
        if(!animal.length==0){
            return res.send({message: 'Animals found:', animal})
        }
            return res.send({message: 'Animals not found'})
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'General Error', e});
    }
}

//Buscar por Id
export const getAnimalById = async(req,res)=>{
    try{
        let id=req.params.id
        let animal=await Animal.findById(id)
        if(!animal){
            return res.status(404).send({message: 'Animal not found'})
        }
            return res.send({message: 'Animal found', animal})
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'General Error', e});
    }
}

//Actualizar
export const updateAnimal = async(req,res)=>{
    try{
        let id=req.params.id
        let data=req.body
        if (data.keeper) {
            let keeper = await User.findById(data.keeper);
            if (!keeper) {
                return res.status(400).send({ message: 'Keeper not found' });
            }
        }
        let updatedAnimal= await Animal.findByIdAndUpdate(id,data,{new:true})
        if(!updatedAnimal) return res.status(404).send({message:'Animal not found'})
            return res.send({ message: 'Animal updated successfully', updatedAnimal });
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'General Error', e});
    }
}

export const deteleAnimal = async(req,res)=>{
    try{
        let id=req.params.id
        let deletedAnimal= await Animal.findByIdAndDelete(id)
        if(!deletedAnimal) return res.status(404).send({message:'Animal not found'})
            return res.send({ message: 'Animal deleted successfully', deletedAnimal });
    }catch(e){
        console.error(e)
        return res.status(500).send({ message: 'General Error', e});
    }
}