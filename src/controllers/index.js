import { Router } from "express";
const router = Router();
import {UserController} from './userController.js';

router.use('/api/users', UserController);

export default router;