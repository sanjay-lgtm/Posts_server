import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getMessage, sentMessage } from '../controllers/message.controller.js';
const router = express.Router();


router.post('/send/:id',isAuthenticated,sentMessage)
router.get('/all/:id',isAuthenticated,getMessage);
export default router;