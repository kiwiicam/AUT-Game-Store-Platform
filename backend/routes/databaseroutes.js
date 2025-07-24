import express from 'express';
import { addUser, changeName, getUserInfo } from '../controllers/databasecontroller.js';

const router = express.Router();

router.post('/adduser', addUser);
router.post('/getuserinfo', getUserInfo);
router.post('/changename', changeName)

export default router;