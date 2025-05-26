import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();
router.post('/:email', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);
router.get('/:email', UserControllers.getSingleUser);
router.patch('/role/:id', UserControllers.updateUserRole);
router.delete('/:id', UserControllers.deleteUser);

export const UserRoutes = router;
