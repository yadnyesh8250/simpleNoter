import express, { Router } from 'express';
import { Authmiddleware } from '../middleware/auth.middleware.js';
import { CreateNote } from '../controller/notes.controller.js';
import { GetUsernotes } from '../controller/notes.controller.js';

const router=express.Router();

router.route("/create_note").post(Authmiddleware,CreateNote);
router.route("/get_user_notes").get(Authmiddleware,GetUsernotes);

export default router;