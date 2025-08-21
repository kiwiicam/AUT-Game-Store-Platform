import express from 'express';
import { addUser, changeName, getUserInfo, uploadGameInformation, retrieveFeaturedGames, getUserSearch, getGameInformation, getDeveloperInformation, uploadComment, retrieveComments, browseGames, retrieveGamesForAdmin, approveGames, denyGames } from '../controllers/databasecontroller.js';

const router = express.Router();

router.post('/adduser', addUser);
router.post('/getuserinfo', getUserInfo);
router.post('/uploadgameinfo', uploadGameInformation);
router.post('/changename', changeName);
router.get('/featuredgames', retrieveFeaturedGames);
router.post('/getusersearch', getUserSearch);
router.post('/getgameinfo', getGameInformation);
router.post('/getdeveloperinfo', getDeveloperInformation);
router.post('/uploadcomment', uploadComment)
router.post('/retrievecomments', retrieveComments);
router.get('/browsegames', browseGames);
router.get('/admingames', retrieveGamesForAdmin);
router.post('/approvegames', approveGames);
router.post('/approvegames', denyGames);

//router.post('/browsegamesbysearch', browseGamesBySearch);

export default router;