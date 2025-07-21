import express from 'express';
import { addUser, getUserInfo } from '../controllers/databasecontroller.js';

const router = express.Router();

router.post('/adduser', addUser);
router.post('/getuserinfo', getUserInfo);

export default router;