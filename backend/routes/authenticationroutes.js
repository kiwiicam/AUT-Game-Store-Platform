import express from 'express';
import { signUp, verifyEmail, resendConfirmationCode, login } from '../controllers/authenticationcontroller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/verify', verifyEmail);
router.post('/resend', resendConfirmationCode)
router.post('/login', login);
export default router;