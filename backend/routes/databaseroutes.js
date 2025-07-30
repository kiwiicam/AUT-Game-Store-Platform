import express from 'express';
import { addUser, changeName, getUserInfo, uploadGameInformation, retrieveFeaturedGames } from '../controllers/databasecontroller.js';

const router = express.Router();

router.post('/adduser', addUser);
router.post('/getuserinfo', getUserInfo);
router.post('/uploadgameinfo', uploadGameInformation);
router.post('/changename', changeName);
router.get('/featuredgames', retrieveFeaturedGames);

export default router;