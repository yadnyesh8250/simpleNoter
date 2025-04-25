import express, { Router } from 'express';
import Notesrouter from './Notes.router.js';
import {loginUser, registerUser,logoutUser} from '../controller/user.controller.js';
import { Authmiddleware } from '../middleware/auth.middleware.js';
const router=Router();

 router.route('/register').post(registerUser);
 router.route('/login').post(loginUser);
 router.route('/logout').post(Authmiddleware,logoutUser)
 router.use('/notes',Notesrouter)
 
// Router.post('/login').post();

export default router;