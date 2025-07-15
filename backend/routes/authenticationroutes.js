import express from 'express';
import { signUp, verifyEmail } from '../controllers/authenticationcontroller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/verify', verifyEmail);
export default router;