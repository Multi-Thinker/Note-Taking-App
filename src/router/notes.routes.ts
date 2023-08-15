import { Router } from 'express';
import { authenticateJWT } from '../middleware/jwt.middleware';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from '../controllers/notes.controller';
const validator = require('express-joi-validation').createValidator({});
import Joi from 'joi';
const router = Router();

const NoteJOI = validator.body(
  Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    type: Joi.string().required(),
  }),
);

router.post('/', authenticateJWT, NoteJOI, createNote);
router.put('/:id', authenticateJWT, NoteJOI, updateNote);
router.delete('/:id', authenticateJWT, deleteNote);
router.get('/', authenticateJWT, getAllNotes);
router.get('/:id', authenticateJWT, getNote);

export default router;
