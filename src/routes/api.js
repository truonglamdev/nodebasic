import express from 'express';

import ApiController from '../controllers/ApiController';
const router = express.Router();

const initApiRoute = (app) => {
    router.get('/user', ApiController.getAllUsers); // Method : [GET] READ
    router.post('/create-user', ApiController.createUser); // Method : [POST]  CREATE
    router.put('/update-user', ApiController.updateUser); // Method : [PUT]  UPDATE
    router.delete('/delete-user/:id', ApiController.deleteUser); // Method : [DELETE]  DELETE

    return app.use('/api/v1', router);
};

export default initApiRoute;
