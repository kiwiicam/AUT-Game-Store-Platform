import express from 'express';
import { addUser, changeName, getUserInfo, uploadGameInformation, retrieveFeaturedGames, getUserSearch, getGameInformation, getDeveloperInformation, uploadComment, retrieveComments, browseGames, retrieveGamesForAdmin, approveGames, denyGames, getAdminGameInfo, getAdminAllUsers, adminUpdateRole, checkAccessByUID, likeGame, hasLiked, removeLike, restoreGame, getPendingDeletionGames, getuid} from '../controllers/databasecontroller.js';
import { addUser, changeName, getUserInfo, uploadGameInformation, retrieveFeaturedGames, getUserSearch, getGameInformation, getDeveloperInformation, uploadComment, retrieveComments, browseGames, retrieveGamesForAdmin, approveGames, denyGames, getAdminGameInfo, getAdminAllUsers, adminUpdateRole, checkAccessByUID, likeGame, hasLiked, removeLike, restoreGame, getPendingDeletionGames, recentReleases, randomGames, classicGames} from '../controllers/databasecontroller.js';

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
router.post('/denygames', denyGames);
router.post('/admingameinfo', getAdminGameInfo)
router.get('/adminallusers', getAdminAllUsers)
router.post('/adminupdaterole', adminUpdateRole)
router.post('/checkaccess', checkAccessByUID)
router.post('/likegame', likeGame);
router.post('/hasliked', hasLiked);
router.post('/removelike', removeLike);
router.get('/getPendingDeletionGames', getPendingDeletionGames);
router.post('/restoregame', restoreGame);
router.post('/getuid',getuid);
router.get('/recentreleases', recentReleases);
router.get('/randomGames', randomGames);
router.get('/classicGames', classicGames);

//router.post('/browsegamesbysearch', browseGamesBySearch);

export default router;