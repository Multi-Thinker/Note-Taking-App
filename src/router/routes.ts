import express from 'express';
import notesRoutes from './notes.routes';
import userRoutes from './user.routes';
const router = express.Router();

router.use('/notes', notesRoutes);
router.use('/user', userRoutes);

export default router;
