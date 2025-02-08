import { Router } from 'express';
import { addAnimal,
        getAnimal,
        getAnimalById,
        updateAnimal,
        deteleAnimal
 } from './animal.controller.js';

 import { validateJwt } from "../../middlewares/validate.jw.js";

const api = Router();

// Definir la ruta 'add' bajo '/animal/add'
api.post('/add', validateJwt ,addAnimal);
api.get('/getAnimals', validateJwt,getAnimal)
api.get('/getAnimals/:id',validateJwt,  getAnimalById)
api.put('/updateAnimal/:id', validateJwt,updateAnimal)
api.delete('/deleteAnimal/:id',validateJwt, deteleAnimal)
export default api;
